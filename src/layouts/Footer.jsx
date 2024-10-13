const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500">© 2024 volunteerwork.vn</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <a className="text-xs hover:underline underline-offset-4" href="#">
          Điều khoản dịch vụ
        </a>
        <a className="text-xs hover:underline underline-offset-4" href="#">
          Chính sách bảo mật
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
