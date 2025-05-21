// components/ui/LoadingLogo.tsx
export const LoadingLogo = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <img
        src={new URL("@assets/images/logos/genshin-logo-loading.webp", import.meta.url).href}
        alt="Logo cargando"
        className="w-1/4 blink opacity-80"
      />
    </div>
  );
};
