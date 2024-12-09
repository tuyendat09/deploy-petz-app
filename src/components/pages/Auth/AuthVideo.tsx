export default function AuthVideo() {
  return (
    <video
      className="hidden h-[95%] w-1/2 max-w-[725px] rounded-lg object-cover md:block"
      autoPlay
      loop
      muted
    >
      <source src="/video/login-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
