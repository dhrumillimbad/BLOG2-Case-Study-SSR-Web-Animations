import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const SVGAnime: NextPage = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const svgElement = useRef<SVGPathElement>(null);
  const menuToggle = useRef<HTMLDivElement>(null);
  const ul_elem = useRef<HTMLUListElement>(null);
  let y: number = 100;
  let c: number = 100;

  useEffect(() => {
    const { current } = svgElement;
    console.log("The SVG path is: ", svgElement.current?.getAttribute("d"));
  }, [toggle]);

  let lerp = (start: number, end: number, t: number): number => {
    return (1-t) * start + t * end
  };

  let animate = () => {
    if (!toggle) {
      y = +lerp(y, 100, 0.075).toFixed(2);
      c = +lerp(c, 100, 0.005).toFixed(2);
    } else {
      y = +lerp(y, 0, 0.05).toFixed(2);
      c = +lerp(c, 0, 0.15).toFixed(2);
    }
    svgElement.current?.setAttribute(
      "d",
      `M 0 ${y} L 0 100 100 100 100 ${y} C 50 ${c}, 50 ${c}, 0 ${y}`
    );
    requestAnimationFrame(animate);
  };

  animate();

  let handleAnime = () => {
    setTimeout(() => {
      setToggle(!toggle);
    }, 200);

    if (toggle) {
      ul_elem.current?.classList.remove("active");
    } else {
      setTimeout(() => {
        ul_elem.current?.classList.add("active");
      }, 300);
    }
    menuToggle.current?.classList.toggle("active");
  };

  return (
    <>
      <div className="container_main">
        <div className="header">
          <div className="menu-tog " ref={menuToggle} onClick={handleAnime}>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="wrapper">
          <svg
            className="transition"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              ref={svgElement}
              className="path"
              stroke="black"
              fill="#fcc42a"
              strokeWidth="1px"
              dur="10s"
              vectorEffect="non-scaling-stroke"
              d="M 0 100 L 100 100 100 100 0 100 C 0 0, 0 0, 0 100"
            />
            <animateMotion dur="10s" repeatCount="indefinite">
              <mpath xlinkHref="#path" />
            </animateMotion>
          </svg>
          <ul ref={ul_elem}>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>PROJECTS</li>
            <li>CONTACT</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(SVGAnime), {
  ssr: false,
});

// export default SVGAnime