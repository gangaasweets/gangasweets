import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { verifyOtp, resendOtp, clearError } from "../redux/slices/authSlice";
import { toast } from "sonner";

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(180); // 3 minutes
    const [canResend, setCanResend] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error } = useSelector((state) => state.auth);
    const email = new URLSearchParams(location.search).get("email");

    useEffect(() => {
        if (!email) {
            navigate("/register");
        }
    }, [email, navigate]);

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(verifyOtp({ email, otp }))
            .unwrap()
            .then(() => {
                toast.success("Email verified successfully! Please login.");
                navigate("/login");
            })
            .catch((err) => {
                toast.error(err.message || "Verification failed");
            });
    };

    const handleResend = () => {
        dispatch(resendOtp(email))
            .unwrap()
            .then(() => {
                toast.success("A new OTP has been sent to your email.");
                setTimer(180);
                setCanResend(false);
            })
            .catch((err) => {
                toast.error(err.message || "Failed to resend OTP");
            });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center min-h-[75vh] p-6 bg-white"
        >
            <div className="w-full max-w-[400px]">
                <div className="text-center mb-10">
                    <h1 className="text-[28px] font-medium tracking-tight mb-2 uppercase">Verify Email</h1>
                    <p className="text-[14px] text-gray-500">
                        We've sent a 6-digit code to <br />
                        <span className="font-medium text-gray-900">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            maxLength="6"
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                                if (error) dispatch(clearError());
                            }}
                            placeholder="000000"
                            className="w-full text-center text-[40px] tracking-[0.5em] font-light py-6 border-b-2 border-gray-100 outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-100"
                            required
                        />
                        <div className="mt-6 p-4 bg-[#FFF8E7] rounded-xl border border-[#D4AF37]/20 uppercase tracking-widest text-[10px]">
                            <p className="text-gray-500 leading-relaxed text-center">
                                <span className="font-bold text-[#D4AF37]">Note:</span> Please check your <span className="font-bold text-gray-900">Spam / Junk</span> folder if you don't see the email in your inbox.
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="w-full bg-[#D4AF37] text-white py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#B8962E] transition-all shadow-lg shadow-[#D4AF37]/20 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {loading ? "Verifying..." : "Verify & Continue"}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        {canResend ? "Didn't receive the code?" : `Resend code in ${formatTime(timer)}`}
                    </p>
                    <button
                        onClick={handleResend}
                        disabled={!canResend || loading}
                        className={`text-[13px] font-bold uppercase tracking-[0.2em] transition-all ${
                            canResend 
                                ? "text-[#D4AF37] hover:text-[#B8962E] cursor-pointer" 
                                : "text-gray-200 cursor-not-allowed"
                        }`}
                    >
                        Resend OTP
                    </button>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                    <button 
                        onClick={() => navigate("/register")}
                        className="text-[11px] font-bold text-gray-300 hover:text-gray-900 transition-colors uppercase tracking-[0.2em]"
                    >
                        Back to registration
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default VerifyOtp;

