// navigation Data
export const navItems = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Thời trang nam",
    url: "/man",
    category: "man",
    imgLink:
      "https://www.chapsandco.com/ae/wp-content/uploads/sites/12/2022/05/MFT1.jpg",
    submenu: [
      {
        title: "Áo thun",
        img: "https://vn-live-01.slatic.net/p/fdfe48d67cbfb54bb14aaf22b7607e6f.jpg",
      },
    ],
  },
  {
    title: "Thời trang nữ",
    url: "/woman",
    category: "woman",
    imgLink:
      "https://img.freepik.com/free-photo/cute-woman-bright-hat-purple-blouse-is-leaning-stand-with-dresses-posing-with-package-isolated-background_197531-17610.jpg",
    submenu: [
      {
        title: "Váy công sở",
        img: "https://dongphuc3mien.vn/wp-content/uploads/2020/05/dam-lien-cong-so-dep1.jpg",
      },
      {
        title: "Đầm dạ hội",
        img: "https://shopcat.vn/images/product/product_s6308.jpg",
      },
    ],
  },
  {
    title: "Mẹ & bé",
    url: "/mom-son",
    category: "mom&son",
  },
  {
    title: "Phụ kiện",
    url: "/pk",
    category: "pk",
  },
];
export const collection = [
  {
    title: "Bộ sưu tập mùa đông",
    img: "https://file.hstatic.net/1000197303/article/3_2dae4dc7a2084abbba282e5f498a70e2.jpg",
    date: "2023-12-12",
  },
  {
    title: "Bộ sưu tập mùa Xuân",
    img: "https://previews.123rf.com/images/bombaytattoo/bombaytattoo1902/bombaytattoo190200029/125041746-new-collection-spring-banner-with-yellow-wild-flowers-on-a-eucalyptus-background.jpg",
    date: "2024-02-15",
  },
];
// product Data
export const productData = [
  {
    id: 1,
    category: "man",
    name: "Áo thun nam Polo",
    image_Url: [
      {
        public_id: "test",
        url: "https://pos.nvncdn.com/3d26e0-79464/ps/20230427_ervam4ZmeM.jpeg",
      },
      {
        public_id: "test",
        url: "https://otherstyle.vn/wp-content/uploads/2021/11/ao-polo-nam-trang-co-phoi-soc-02.jpg",
      },
    ],
    price: 439000,
    discount_price: 399000,
    rating: 4.6,
    total_sell: 35,
    stock: 10,
    date: "2024-02-16",
  },
  {
    id: 2,
    category: "woman",
    name: "Đầm dạ hội",
    image_Url: [
      {
        public_id: "test",
        url: "https://maxi.vn/wp-content/uploads/2022/05/z3436386353722_a0969a6f6e0014ef86a410949b746542-650x845.jpg",
      },
      {
        public_id: "test",
        url: "https://maxi.vn/wp-content/uploads/2022/05/z3436386353722_a0969a6f6e0014ef86a410949b746542-650x845.jpg",
      },
    ],
    price: 1439000,
    discount_price: 1399000,
    rating: 4.9,
    total_sell: 35,
    stock: 10,
    date: "2024-02-17",
  },
  {
    id: 3,
    category: "woman",
    name: "Váy công chúa",
    image_Url: [
      {
        public_id: "test",
        url: "https://cf.shopee.vn/file/a3daa9ef267a4f09d7488561031d0c6f",
      },
      {
        public_id: "test",
        url: "https://cf.shopee.vn/file/a3daa9ef267a4f09d7488561031d0c6f",
      },
    ],
    price: 839000,
    discount_price: 809000,
    rating: 5,
    total_sell: 9,
    stock: 10,
    date: "2024-02-01",
  },
  {
    id: 4,
    category: "man",
    name: "Áo thun nam Polo",
    image_Url: [
      {
        public_id: "test",
        url: "https://pos.nvncdn.com/3d26e0-79464/ps/20230427_ervam4ZmeM.jpeg",
      },
      {
        public_id: "test",
        url: "https://otherstyle.vn/wp-content/uploads/2021/11/ao-polo-nam-trang-co-phoi-soc-02.jpg",
      },
    ],
    price: 439000,
    discount_price: 399000,
    rating: 5,
    total_sell: 35,
    stock: 10,
    date: "2024-02-16",
  },
  {
    id: 5,
    category: "man",
    name: "Áo thun nam Polo",
    image_Url: [
      {
        public_id: "test",
        url: "https://pos.nvncdn.com/3d26e0-79464/ps/20230427_ervam4ZmeM.jpeg",
      },
      {
        public_id: "test",
        url: "https://otherstyle.vn/wp-content/uploads/2021/11/ao-polo-nam-trang-co-phoi-soc-02.jpg",
      },
    ],
    price: 439000,
    discount_price: 399000,
    rating: 4.8,
    total_sell: 35,
    stock: 10,
    date: "2024-02-16",
  },
  {
    id: 6,
    category: "man",
    name: "Áo thun nam Polo",
    image_Url: [
      {
        public_id: "test",
        url: "https://pos.nvncdn.com/3d26e0-79464/ps/20230427_ervam4ZmeM.jpeg",
      },
      {
        public_id: "test",
        url: "https://otherstyle.vn/wp-content/uploads/2021/11/ao-polo-nam-trang-co-phoi-soc-02.jpg",
      },
    ],
    price: 439000,
    discount_price: 399000,
    rating: 4.6,
    total_sell: 35,
    stock: 10,
    date: "2024-01-16",
  },
];

export const footerProductLinks = [
  {
    name: "Thông tin",
    link: "/about",
  },
  {
    name: "Nhân viên",
    link: "/carrers",
  },
  {
    name: "Vị trí cửa hàng",
  },
  {
    name: "Blog",
  },
  {
    name: "Đánh giá",
  },
];

export const footercompanyLinks = [
  {
    name: "Giải trí",
  },
  {
    name: "Điện thoại và máy tính bảng",
  },
  {
    name: "Máy tính và laptop",
  },
  {
    name: "Sự kiện",
  },
];

export const footerSupportLinks = [
  {
    name: "Đánh giá",
  },
  {
    name: "Liên hệ",
  },
  {
    name: "Vận chuyển",
  },
  {
    name: "Livestream",
  },
];
