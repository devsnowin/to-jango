import AuthForm from "../components/auth-form";

export default function RegisterPage() {
    return(
        <main className="min-h-screen max-w-[20rem] mx-auto flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl mb-4">Register</h1>
            <AuthForm method="register" />
        </main>
    )
}