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
    date: "2024-02-5",
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
    date: "2024-02-07",
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
    collection: "spring",
  },
  {
    id: 7,
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
  {
    id: 8,
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
    collection: "spring",
  },
  {
    id: 9,
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
    collection: "spring",
  },
  {
    id: 10,
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
    collection: "spring",
  },
  {
    id: 11,
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
    collection: "spring",
  },
  {
    id: 12,
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
    collection: "spring",
  },
];

export const discountEventData = [
  {
    name: "Giảm giá sự kiện mùa Xuân",
    collection: "spring",
    img: "https://previews.123rf.com/images/mash3r/mash3r1803/mash3r180300009/96829941-new-spring-collection-poster-template-with-floral-elements.jpg",
    discount_rate: 12,
    start_date: "2024-02-21",
    end_date: "2024-02-28 00:00:00",
  },
  {
    name: "Giảm giá sự kiện mùa Xuân - Hạ",
    collection: "spring-summer",
    img: "https://blog.patra.com/wp-content/uploads/2020/02/Spring-summer-collection-1-730x550.png",
    discount_rate: 13,
    start_date: "2024-02-23",
    end_date: "2024-03-12",
  },
  {
    name: "Giảm giá sự kiện mùa Hạ",
    collection: "summer",
    img: "https://boldoutline.in/wp-content/uploads/2021/05/Web-cover-101.jpg",
    discount_rate: 8,
    start_date: "2024-02-20",
    end_date: "2024-03-12",
  },
];

export const blogData = [
  {
    id:1,
    name: "Những điều cần biết ",
    img: "https://routine.vn/media/magefan_blog/cach-phan-biet-cac-loai-quan-tay-nam.jpg",
    created_at: "2024-02-19",
    description:
      "Luôn là sản phẩm Top of mind và là sự ưu tiên hàng đầu của tất cả các quý ông thời thượng, quần tây nam là một trong những trang phục tượng trưng cho vẻ đẹp lịch lãm, phong cách, lãng tử - một sự lựa chọn lý tưởng nên có trong tủ quần áo của nam giới đang theo đuổi phong cách formal.Theo thời gian, những thiết kế quần tây dành cho nam giới ngày đã trở nên đa dạng, không chỉ dừng lại những kiểu ống suông, ống ôm cơ bản, mà còn có thêm các chi tiết hiện đại như xếp ly, phối thun, cut-out táo bạo,... không thua kém kiểu dáng quần của chị em phụ nữ.Để hiểu rõ hơn về chiếc quần tây, cách phối quần tây dành cho nam cũng như cách phân biệt các loại quần tây nam phổ biến nhất hiện nay, mời bạn theo dõi tiếp bài viết sau đây!",
  },
  {
    id:2,
    name: "Những điều cần biết và cách phân biệt các loại quần tây nam từ A - Z",
    img: "https://routine.vn/media/amasty/webp/wysiwyg/banner_web-06_jpg.webp",
    created_at: "2024-02-20",
    description:
      "Luôn là sản phẩm Top of mind và là sự ưu tiên hàng đầu của tất cả các quý ông thời thượng, quần tây nam là một trong những trang phục tượng trưng cho vẻ đẹp lịch lãm, phong cách, lãng tử - một sự lựa chọn lý tưởng nên có trong tủ quần áo của nam giới đang theo đuổi phong cách formal.Theo thời gian, những thiết kế quần tây dành cho nam giới ngày đã trở nên đa dạng, không chỉ dừng lại những kiểu ống suông, ống ôm cơ bản, mà còn có thêm các chi tiết hiện đại như xếp ly, phối thun, cut-out táo bạo,... không thua kém kiểu dáng quần của chị em phụ nữ.Để hiểu rõ hơn về chiếc quần tây, cách phối quần tây dành cho nam cũng như cách phân biệt các loại quần tây nam phổ biến nhất hiện nay, mời bạn theo dõi tiếp bài viết sau đây!",
  },
  {
    id:3,
    name: "22",
    img: "https://routine.vn/media/amasty/webp/wysiwyg/banner_web-05_jpg.webp",
    created_at: "2024-02-22",
    description:
      "Luôn là sản phẩm Top of mind và là sự ưu tiên hàng đầu của tất cả các quý ông thời thượng, quần tây nam là một trong những trang phục tượng trưng cho vẻ đẹp lịch lãm, phong cách, lãng tử - một sự lựa chọn lý tưởng nên có trong tủ quần áo của nam giới đang theo đuổi phong cách formal.Theo thời gian, những thiết kế quần tây dành cho nam giới ngày đã trở nên đa dạng, không chỉ dừng lại những kiểu ống suông, ống ôm cơ bản, mà còn có thêm các chi tiết hiện đại như xếp ly, phối thun, cut-out táo bạo,... không thua kém kiểu dáng quần của chị em phụ nữ.Để hiểu rõ hơn về chiếc quần tây, cách phối quần tây dành cho nam cũng như cách phân biệt các loại quần tây nam phổ biến nhất hiện nay, mời bạn theo dõi tiếp bài viết sau đây!",
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
