import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection"

function App() {
  return (
      // A wrapper to hold everything
      <main className="w-full min-h-screen bg-black">
        <HeroSection />
        <AboutSection />
      </main>
    );
}

export default App;
