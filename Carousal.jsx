const Carousal = () => {
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div
          className="carousel-inner"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-item active">
            <img
              src="https://freepngimg.com/thumb/food/2-2-food-png-hd.png"
              className="d-block w-100"
              style={{ maxHeight: "500px" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://freepngimg.com/thumb/food/9-2-food-png-file.png"
              className="d-block w-100"
              style={{ maxHeight: "500px" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.freepnglogos.com/uploads/food-png/food-plate-png-transparent-image-pngpix-2.png"
              className="d-block w-100"
              style={{ maxHeight: "500px" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
export default Carousal;
