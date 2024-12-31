import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import Particles from "react-particles";
import { Typewriter } from "react-simple-typewriter";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";

export default function Index(props) {
  const { data, setData, post, processing, reset } = useForm({ name: "" });
  const [message, setMessage] = useState(["2025 Countdown.. 👋"]);
  const [paused, setPaused] = useState(true);
  const [audio, setAudio] = useState();

  useEffect(() => {
    const audioFile = new Audio("/audio.m4a");
    audioFile.loop = true;
    setAudio(audioFile);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post("/", { onSuccess: () => reset() });
  };

  const buttonAudioToggle = () => {
    setPaused(!paused);
    paused == true ? audio.play() : audio.pause();
  };

  const init = async (engine) => {
    await loadFireworksPreset(engine);
  };

  const targetDate = () => {
    const target = new Date("January 1, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    return target - now;
  };

  return (
    <>
      <Head title="Happy New Year 2025!" />
      <Particles options={{ preset: "fireworks" }} init={init} />
      <div className="font-sans flex justify-center items-center flex-col gap-8 min-h-screen">
        <span className="text-5xl font-bold z-50 text-white text-center">
          <Typewriter
            words={message}
            loop={false}
            cursor={"_"}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
        <div className="text-white text-2xl z-50">
          <Countdown
            date={Date.now() + targetDate()}
            overtime={true}
            onComplete={() =>
              setMessage([
                "HAPPY",
                "NEW",
                "YEAR",
                "2025",
                "HAPPY NEW YEAR 2025 🎉",
              ])
            }
          />
        </div>
        <button
          type="button"
          onClick={buttonAudioToggle}
          className="p-4 bg-slate-800 rounded-md z-50"
        >
          {paused ? "🔊" : "🔈"}
        </button>
        <h2 className="text-white text-xl z-50">Absen Yang Dari 2024!</h2>
        <form onSubmit={submit} className="flex flex-row gap-2">
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            className="p-2 rounded-md z-50"
          />
          <button
            type="submit"
            disabled={processing}
            className="p-2 rounded-md bg-blue-900 text-white z-50"
          >
            Kirim
          </button>
        </form>
        <div className="z-50">
          {props.messages.map((el) => (
            <p className="text-center w-64 p-2 m-2 rounded-md bg-white text-black">
              {el.name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
