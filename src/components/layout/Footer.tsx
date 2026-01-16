import { Container } from "@/components/ui/Container"

export function Footer() {
    return (
        <footer className="border-t py-6 md:py-0 glass">
            <Container>
                <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Stun Design
                    </p>
                    <div className="flex items-center gap-4">
                        {/* Social icons would go here */}
                        <span className="text-sm text-muted-foreground">© 2026 Stunley Opeña</span>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
