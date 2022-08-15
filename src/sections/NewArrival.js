import { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import img1 from "../assets/Images/11.webp";
import img2 from "../assets/Images/12.webp";
import img3 from "../assets/Images/13.webp";
import img4 from "../assets/Images/14.webp";

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  /* background-color: yellow; */
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 90vh;

  box-shadow: 0 0 0 5vw ${(props) => props.theme.text};
  border: 3px solid ${(props) => props.theme.body};
  z-index: 11;

  @media (max-width: 70em) {
    width: 40vw;
    height: 80vh;
  }

  @media (max-width: 64em) {
    width: 50vw;
    box-shadow: 0 0 0 60vw ${(props) => props.theme.text};
  }

  @media (max-width: 48em) {
    width: 60vw;
  }

  @media (max-width: 30em) {
    width: 80vw;
    height: 60vh;
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 300;
  text-shadow: 1px 1px 1px ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  position: absolute;
  top: 1rem;
  left: 5%;
  z-index: 11;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxxl};
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Text = styled.div`
  width: 20%;
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
  position: absolute;
  padding: 2rem;
  top: 0;
  right: 0;
  z-index: 11;

  @media (max-width: 48em) {
    display: none;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 25vw;
  height: auto;

  /* width: 65%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 64em) {
    width: 30vw;
  }

  @media (max-width: 48em) {
    width: 40vw;
  }

  @media (max-width: 30em) {
    width: 60vw;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;

  img {
    width: 100%;
    height: auto;
    z-index: 5;
  }
`;

const Product = ({ img, title = "" }) => {
  return (
    <Item>
      <img src={img} alt={title} />
      <h1>{title}</h1>
    </Item>
  );
};

function NewArrival() {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);
  const scrollingRef = useRef(null);

  useLayoutEffect(() => {
    let element = ref.current;
    let scrollingElement = scrollingRef.current;

    let tl = gsap.timeline();

    setTimeout(() => {
      tl.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom+=100% top-=100%",
          scroller: ".App", // Locomotive Element
          scrub: true,
          pin: true,
          // markers: true,
        },
        // increase scrolling height of section same as the scrolling element width
        height: `${scrollingElement.scrollWidth}px`,
        ease: "none",
      });

      tl.fromTo(
        scrollingElement,
        {
          y: "0",
        },
        {
          y: "-100%",
          scrollTrigger: {
            trigger: scrollingElement,
            start: "top top",
            end: "bottom top",
            scroller: ".App", // Locomotive Element
            scrub: true,
            // markers: true,
          },
        }
      );
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      // Clear Instances
      tl.kill();
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <Section ref={ref} id="new-arrival">
      <Overlay />
      <Title
        data-scroll
        data-scroll-speed="-2"
        data-scroll-direction="horizontal"
      >
        New Arrivals
      </Title>

      <Text data-scroll data-scroll-speed="-4">
        We're fashion studio based in california. We create unique designs that
        will blow your mind. We also design unique jewellary pieces. Fashion is
        an ART that can not be grasped by everyone. We are very dedicated to
        making our products. We offer unique and creative products to a wide
        range of people. We have a variety of styles, but for most people, all
        of the options are in the box. We specialize in making things that make
        you happy. We strive to build on our vision. As a fashion label, we do
        our best to create amazing experiences for all people. We are always
        looking to make something that is easy for everyone.
      </Text>

      <Container ref={scrollingRef}>
        <Product img={img1} title="Denim" />
        <Product img={img2} title="Cool Dresses" />
        <Product img={img3} title="Jackets" />
        <Product img={img4} title="T-shirts" />
      </Container>
    </Section>
  );
}

export default NewArrival;
