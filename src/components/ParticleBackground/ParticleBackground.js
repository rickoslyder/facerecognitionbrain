import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";


const ParticlesBackground = () => {
    const particlesOptions = {
        // background: {
        //     color: {
        //         value: "#B594B6",
        //     },
        // },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: false,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#9B489B",
            },
            links: {
                color: "#935FA7",
                distance: 150,
                enable: true,
                opacity: 0.4,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                directions: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 120,
            },
            opacity: {
                value: 0.4,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
      }
    
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);
    
    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    return (
        <Particles
        className='particles'
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
    />
    )

}

export default ParticlesBackground;