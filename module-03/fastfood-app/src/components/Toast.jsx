import { useCart } from "../contextapi/CartContext";

export default function Toast() {
    const { toast } = useCart();

    if (!toast) return null;

    const isSuccess = toast.type === "success";

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
            <div
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-semibold backdrop-blur-md ${
                    isSuccess
                        ? "bg-slate-900/95 text-white border-orange-500/40 shadow-orange-500/10"
                        : "bg-slate-900/95 text-white border-sky-500/40"
                }`}
            >
                <span className="text-xl">
                    {isSuccess ? "🍔" : "ℹ️"}
                </span>
                <span>{toast.message}</span>
            </div>
        </div>
    );
}
