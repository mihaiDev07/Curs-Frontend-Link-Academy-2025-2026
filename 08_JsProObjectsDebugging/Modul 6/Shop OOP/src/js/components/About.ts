export class About {
  render(): HTMLElement {
    const aboutContainer = document.createElement("div");
    aboutContainer.innerHTML = `
        <h1 class="text-center py-3">About Us</h1>
        <p class="text-center">Welcome to the About page! Here you can learn more about us.</p>
        <div class="about-content">
          <p class="text-center">We are passionate about programming and teaching others how to turn ideas into reality.</p>
          <p class="text-center">Our mission is to provide high-quality education and resources for developers of all levels.</p>
        </div>

  <div class="container">
  <div class="row gy-3 gy-md-4 gy-lg-4 mb-3">
    <div class="col-12 col-lg-6">
      <div class="card bg-light p-3 m-0">
        <div class="row gy-3 gy-md-0 align-items-md-center">
          <div class="col-md-5">
            <img src="./assets/images/about-img-2.jpg" class="img-fluid rounded-start" alt="Why Choose Us?">
          </div>
          <div class="col-md-7">
            <div class="card-body p-0">
              <h2 class="card-title h4 mb-3">Why Choose Us?</h2>
              <p class="card-text lead">With years of experience and deep industry knowledge, we have a proven track record of success and are pushing ourselves to stay ahead of the curve.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-6">
      <div class="card bg-light p-3 m-0">
        <div class="row gy-3 gy-md-0 align-items-md-center">
          <div class="col-md-5">
            <img src="./assets/images/about-img-1.jpg" class="img-fluid rounded-start" alt="Visionary Team">
          </div>
          <div class="col-md-7">
            <div class="card-body p-0">
              <h2 class="card-title h4 mb-3">Visionary Team</h2>
              <p class="card-text lead">With a team of visionary engineers, developers, and creative minds, we embark on a journey to transform complex challenges into ingenious technological solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
     <div class="col-12 col-lg-6">
      <div class="card bg-light p-3 m-0">
        <div class="row gy-3 gy-md-0 align-items-md-center">
          <div class="col-md-5">
            <img src="./assets/images/about-img-2.jpg" class="img-fluid rounded-start" alt="Why Choose Us?">
          </div>
          <div class="col-md-7">
            <div class="card-body p-0">
              <h2 class="card-title h4 mb-3">Why Choose Us?</h2>
              <p class="card-text lead">With years of experience and deep industry knowledge, we have a proven track record of success and are pushing ourselves to stay ahead of the curve.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-6">
      <div class="card bg-light p-3 m-0">
        <div class="row gy-3 gy-md-0 align-items-md-center">
          <div class="col-md-5">
            <img src="./assets/images/about-img-1.jpg" class="img-fluid rounded-start" alt="Visionary Team">
          </div>
          <div class="col-md-7">
            <div class="card-body p-0">
              <h2 class="card-title h4 mb-3">Visionary Team</h2>
              <p class="card-text lead">With a team of visionary engineers, developers, and creative minds, we embark on a journey to transform complex challenges into ingenious technological solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      `;
    return aboutContainer;
  }
}
