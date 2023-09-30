import "./footer.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div class="container">
          <div class="footer-content">
            <div class="footer-section about">
              <h3>About Us</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                tempor justo ut ex hendrerit, ac eleifend tellus imperdiet.
              </p>
            </div>
            <div class="footer-section links">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Menu</a>
                </li>
                <li>
                  <a href="#">Order Now</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
            <div class="footer-section contact">
              <h3>Contact Us</h3>
              <p>123 Street, City</p>
              <p>info@example.com</p>
              <p>+1234567890</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
