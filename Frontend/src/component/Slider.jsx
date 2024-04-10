import React, { useEffect, useState } from "react";
import useFetchCollection from "../CustomeHook/useFetchCollection";

const Slider = () => {
  const { data } = useFetchCollection("slider");
  const slider =data.filter((d) =>d.status=="active" );
  // let [slider, setSlider] = useState([]);
  // useEffect(() => {
  //   getSlider()
  // }, []);

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                  {slider.length != 0 &&
                    slider.map((s, i) => {
                      <div class={""}>
                        <img
                          src={s.imageUrl}
                          class="d-block w-100"
                          height="500"
                        />
                      </div>;
                    })}
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slider;
