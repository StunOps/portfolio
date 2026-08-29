import { Container } from "@/components/ui/Container"

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-transparent py-3 sm:py-4">
            <Container>
                <div className="flex flex-row items-center justify-between gap-2 text-xs sm:text-sm text-muted-foreground">
                    <p className="font-semibold text-white/80">Stun Design</p>
                    <span>© 2026 Stunley Opeña</span>
                </div>
            </Container>
        </footer>
    )
}
