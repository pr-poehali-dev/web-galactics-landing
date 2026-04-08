import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Advantages from "@/components/Advantages";
import Reviews from "@/components/Reviews";
import Calculator from "@/components/Calculator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <About />
      <Services onOpenModal={openModal} />
      <Portfolio />
      <Advantages />
      <Reviews />
      <Calculator onOpenModal={openModal} />
      <ContactForm />
      <Footer />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default Index;