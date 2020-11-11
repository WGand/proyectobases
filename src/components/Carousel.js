import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import "bootstrap";

export default function Carousel() {
  return (
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active fixImage">
          <img
            src="https://http2.mlstatic.com/preservativo-duo-set-de-3-caja-x-12-unidades-D_NQ_NP_976175-MLV31252137208_062019-O.webp"
            class="img-responsive d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item fixImage">
          <img
            src="https://http2.mlstatic.com/D_NQ_NP_618989-MLV42820049681_072020-W.webp"
            class="img-responsive d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item fixImage">
          <img
            src="https://http2.mlstatic.com/bicicleta-trek-2021-marlin-6-nuevas-precio-remate-D_NQ_NP_861593-MLV43772082727_102020-V.webp"
            class="img-responsive d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  );
}
