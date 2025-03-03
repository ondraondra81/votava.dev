import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
    title: 'Přihlášení | votava.dev',
    description: 'Přihlášení do administrace webu votava.dev'
}

export default function LoginPage() {

    return (
       <LoginForm/>
    )
}