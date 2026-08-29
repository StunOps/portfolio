import { Container } from "@/components/ui/Container"

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-transparent py-6">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                        Stun Design
                    </p>
                    <span className="text-sm text-muted-foreground">© 2026 Stunley Opeña</span>
                </div>
            </Container>
        </footer>
    )
}
