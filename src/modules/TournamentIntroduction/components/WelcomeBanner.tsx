import video from "@assets/videos/bg_landing.mp4";

export const WelcomeBanner = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video className="absolute top-0 left-0 w-full h-full object-cover" src={video} autoPlay muted loop playsInline />

      {/* Opacity layer */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center text-center w-full h-full">
        <div className="flex flex-col items-center justify-center gap-6 max-w-4xl px-10">
          <h1 className="text-5xl text-white drop-shadow-lg">GENSHIN ROYAL RUMBLE</h1>
          <span className="text-lg text-amber-100">
            Create your own custom tournaments using your favorite Genshin Impact characters and see who comes out on
            top!
          </span>
        </div>
      </div>
    </div>
  );
};
