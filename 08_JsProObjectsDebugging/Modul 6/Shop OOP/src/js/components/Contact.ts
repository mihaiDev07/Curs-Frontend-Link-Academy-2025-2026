export class Contact {
  render(): HTMLElement {
    const contactContainer = document.createElement("div");
    contactContainer.innerHTML = `
        <h1 class="text-center py-3">Contact Us</h1>
        <p class="text-center">We'd love to hear from you! Get in touch with us.</p>
        <div class="contact-content">
          <div class="container">
            <div class="row gy-3 gy-md-4 gy-lg-4 mb-3">
              <div class="col-12 col-lg-6">
                <div class="card bg-light p-3 m-0">
                  <div class="row gy-3 gy-md-0 align-items-md-center">
                    <div class="col-md-5">
                      <img src="./assets/images/about-img-1.jpg" class="img-fluid rounded-start" alt="Contact Image">
                    </div>
                    <div class="col-md-7">
                      <div class="card-body p-0">
                        <h2 class="card-title h4 mb-3">Get In Touch</h2>
                        <p class="card-text lead">Have a question or want to work together? Feel free to reach out to us.</p>
                        <ul class="list-unstyled">
                          <li class="mb-2"><i class="bi bi-envelope me-2"></i>contact@shopjsOOP.com</li>
                          <li class="mb-2"><i class="bi bi-telephone me-2"></i>+1 234 567 890</li>
                          <li class="mb-2"><i class="bi bi-geo-alt me-2"></i>123 Web Dev Street, Code City</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="card bg-light p-3 m-0">
                  <div class="card-body">
                    <h2 class="card-title h4 mb-3">Send Us a Message</h2>
                    <form>
                      <div class="mb-3">
                        <label for="nameInput" class="form-label">Name</label>
                        <input type="text" class="form-control" id="nameInput" placeholder="Your Name">
                      </div>
                      <div class="mb-3">
                        <label for="emailInput" class="form-label">Email</label>
                        <input type="email" class="form-control" id="emailInput" placeholder="name@example.com">
                      </div>
                      <div class="mb-3">
                        <label for="messageInput" class="form-label">Message</label>
                        <textarea class="form-control" id="messageInput" rows="4" placeholder="Your Message"></textarea>
                      </div>
                      <button type="submit" class="btn btn-primary">Send Message</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
    return contactContainer;
  }
}
