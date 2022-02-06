import React from "react";

const footerYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
      <div>{/* Put svg icon */}</div>
      <p>Copyright &copy; {footerYear} All rights reserved</p>
    </footer>
  );
};

export default Footer;
