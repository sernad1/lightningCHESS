import DeleteAccountButton from "../DeleteAccountButton";
import SignOutButton from "../sign-out-button";

export function SettingsFooter(){
    return (
        <section className="space-y-4 pt-6 border-t border-main-dark/60">
            <h2 className="text-xl font-semibold text-main-white">Ustawienia konta</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-neutral-200 border-2 border-green-600 rounded-2xl p-6 flex flex-col items-start shadow-lg [&_button]:mt-auto [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-xl [&_button]:bg-neutral-900 [&_button]:text-white [&_button]:text-sm [&_button]:font-semibold [&_button]:hover:bg-neutral-800 [&_button]:transition-colors [&_button]:cursor-pointer">
                    <h3 className="text-lg font-semibold text-black mb-1.5">Sesja</h3>
                    <p className="text-sm text-black mb-5">Wyloguj się z bieżącej sesji na tym urządzeniu.</p>
                    <SignOutButton />
                </div>

                <div className="bg-neutral-200 border-2 border-neutral-400 rounded-2xl p-6 flex flex-col items-start shadow-lg [&_button]:mt-auto">
                    <h3 className="text-lg font-semibold text-red-700 mb-1.5">Usuwanie konta</h3>
                    <p className="text-sm text-black mb-5">Trwałe usunięcie konta i powiązanych z nim danych.</p>
                <DeleteAccountButton />
                </div>
            </div>
        </section>
    )
}