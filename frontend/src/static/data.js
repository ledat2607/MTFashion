// navigation Data
export const navItems = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Sản phẩm",
    subMenu: [
      {
        categoryName: "Sản phẩm nam",
        subCategories: [
          { title: "Áo thun" },
          { title: "Áo sơ mi" },
          { title: "Quần tây" },
        ],
      },
      {
        categoryName: "Sản phẩm nữ",
        subCategories: [{ title: "Váy-Đầm" }, { title: "Blazer" }],
      },
      {
        categoryName: "Sản phẩm mẹ và bé",
        subCategories: [{ title: "Áo thun" }, { title: "Áo sơ mi" }],
      },
      {
        categoryName: "Phụ kiện",
        subCategories: [{ title: "Đồng hồ" }, { title: "Mắt kính" }],
      },
    ],
    url: "/product",
  },
  {
    title: "Hot Deals",
    url: "/hot-deals",
  },
  {
    title: "Về chúng tôi",
    url: "/about-us",
  },
];
export const categories = [
  {
    id: 1,
    name: "Sản phẩm nam",
    value: "man",
    type: [
      { valueType: "Áo thun", nameType: "Áo thun", idType: 1 },
      { valueType: "Áo sơ mi", nameType: "Áo sơ mi", idType: 2 },
      { valueType: "Quần âu", nameType: "Quần âu", idType: 3 },
    ],
  },
  {
    id: 2,
    name: "Sản phẩm nữ",
    value: "woman",
  },
  {
    id: 3,
    name: "Sản phẩm mẹ và bé",
    value: "mon-son",
  },
  {
    id: 4,
    name: "Phụ kiện",
    value: "accessories",
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
  {
    title: "Bộ sưu tập mùa hè",
    img: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/new-arrivals-summer-collection-facebook-shop-design-template-675021b8223ac942ae1d3254a51589e4_screen.jpg?ts=1591073149",
    data: "2024-04-18",
  },
  {
    title: "Bộ sưu tập Váy - Đầm cao cấp",
    img: "https://hstatic.net/729/1000112729/1000156229/slide_image_2.jpg?v=3551",
    data: "2024-04-18",
  },
  {
    title: "Bộ sưu tập Nam",
    img: "https://www.bonsoir.co.in/cdn/shop/articles/4_1_1024x1024.jpg?v=1687944095",
    data: "2024-04-18",
  },
];
// product Data
export const productData = [
  {
    id: 1,
    category: "man",
    name: "Áo thun nam Polo",
    type: "Áo thun",
    size: [{ itemSize: "S" }, { itemSize: "Xl" }],
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
    date: "2024-02-20",
    material: [{ itemMat: "Vải" }, { itemMat: "Coton" }],
    comment: [
      {
        userName: "Lê Đạt",
        avatar:
          "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/402620919_358162883406972_8835788119796631121_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGrlQPVBV6AsMju-wTS_wO_zXnRQJfcj3_NedFAl9yPfxqTfszm37HSg55WsAgi_z2UTQPQgnAqnh42SdfGGnc4&_nc_ohc=haowL0MqsKoAX_ZKFTM&_nc_ht=scontent.fsgn16-1.fna&oh=00_AfDubYTudIHbqr4WJGjR0BLNRbImdHSmrCVmg1kdmiBNxw&oe=65E9826C",
        date: "2023-03-03 18:30:29",
        star: 5,
        content: "Sản phẩm thật tuyệt vời",
        imgCmt: [
          {
            url: "https://otherstyle.vn/wp-content/uploads/2021/11/ao-polo-nam-trang-co-phoi-soc-02.jpg",
          },
        ],
      },
      {
        userName: "Lê Lưu Quốc Đạt",
        avatar:
          "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/402620919_358162883406972_8835788119796631121_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGrlQPVBV6AsMju-wTS_wO_zXnRQJfcj3_NedFAl9yPfxqTfszm37HSg55WsAgi_z2UTQPQgnAqnh42SdfGGnc4&_nc_ohc=haowL0MqsKoAX_ZKFTM&_nc_ht=scontent.fsgn16-1.fna&oh=00_AfDubYTudIHbqr4WJGjR0BLNRbImdHSmrCVmg1kdmiBNxw&oe=65E9826C",
        date: "2023-03-03 18:30:29",
        star: 4,
        content:
          "Sản phẩm xứng đáng với số tiền bỏ ra, tuy nhiên gói quà chưa được tốt",
        imgCmt: [
          {
            url: "https://otherstyle.vn/wp-content/uploads/2021/11/ao-polo-nam-trang-co-phoi-soc-02.jpg",
          },
        ],
      },
      {
        userName: "Phú Thành",
        avatar:
          "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/402620919_358162883406972_8835788119796631121_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGrlQPVBV6AsMju-wTS_wO_zXnRQJfcj3_NedFAl9yPfxqTfszm37HSg55WsAgi_z2UTQPQgnAqnh42SdfGGnc4&_nc_ohc=haowL0MqsKoAX_ZKFTM&_nc_ht=scontent.fsgn16-1.fna&oh=00_AfDubYTudIHbqr4WJGjR0BLNRbImdHSmrCVmg1kdmiBNxw&oe=65E9826C",
        date: "2023-03-03 18:30:29",
        star: 2,
        content: "Sản phẩm làm tôi quá thất vọng",
        imgCmt: [
          {
            url: "https://otherstyle.vn/wp-content/uploads/2021/11/ao-polo-nam-trang-co-phoi-soc-02.jpg",
          },
          {
            url: "https://maxi.vn/wp-content/uploads/2022/05/z3436386353722_a0969a6f6e0014ef86a410949b746542-650x845.jpg",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    category: "woman",
    name: "Đầm dạ hội",
    type: "Đầm",
    image_Url: [
      {
        code: "MK159",
        url: "https://maxi.vn/wp-content/uploads/2022/05/z3436386353722_a0969a6f6e0014ef86a410949b746542-650x845.jpg",
      },
      {
        code: "MK19",
        url: "https://maxi.vn/wp-content/uploads/2022/05/z3436386353722_a0969a6f6e0014ef86a410949b746542-650x845.jpg",
      },
    ],
    price: 1439000,
    discount_price: 1399000,
    rating: 4.9,
    total_sell: 35,
    stock: 10,
    date: "2024-03-12",
    material: [{ itemMat: "Vải" }, { itemMat: "Coton" }],
    size: [{ itemSize: "S" }, { itemSize: "Xl" }],
    isOnSales: {
      status: true,
      discount_rate: 25,
      price_sale: 1080000,
      start_date: "2024-03-12 21:00:00", // Corrected datetime format
      end_date: "2024-03-15 00:00:00",
    },
  },
  {
    id: 3,
    category: "woman",
    name: "Váy công chúa",
    type: "Váy",
    image_Url: [
      {
        code: "MK159",

        url: "https://cf.shopee.vn/file/a3daa9ef267a4f09d7488561031d0c6f",
      },
      {
        code: "MK19",
        url: "https://thieuhoa.com.vn/wp-content/uploads/2023/02/0sRuNot9KIZSezje3UfGV0S6tP7Fgl8JKQHrevoE.webp",
      },
    ],
    size: [{ itemSize: "S" }, { itemSize: "Xl" }],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    price: 839000,
    discount_price: 809000,
    rating: 5,
    total_sell: 9,
    stock: 10,
    date: "2024-02-22",
    material: [{ itemMat: "Vải" }, { itemMat: "Coton" }],
    comment: [
      {
        userName: "Lê Đạt",
        avatar:
          "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/402620919_358162883406972_8835788119796631121_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGrlQPVBV6AsMju-wTS_wO_zXnRQJfcj3_NedFAl9yPfxqTfszm37HSg55WsAgi_z2UTQPQgnAqnh42SdfGGnc4&_nc_ohc=haowL0MqsKoAX_ZKFTM&_nc_ht=scontent.fsgn16-1.fna&oh=00_AfDubYTudIHbqr4WJGjR0BLNRbImdHSmrCVmg1kdmiBNxw&oe=65E9826C",
        date: "2023-03-03 18:30:29",
        star: 5,
        content: "Sản phẩm thật tuyệt vời",
        imgCmt: [
          {
            url: "https://otherstyle.vn/wp-content/uploads/2021/11/ao-polo-nam-trang-co-phoi-soc-02.jpg",
          },
        ],
      },
      {
        userName: "Lê Lưu Quốc Đạt",
        avatar:
          "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/402620919_358162883406972_8835788119796631121_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGrlQPVBV6AsMju-wTS_wO_zXnRQJfcj3_NedFAl9yPfxqTfszm37HSg55WsAgi_z2UTQPQgnAqnh42SdfGGnc4&_nc_ohc=haowL0MqsKoAX_ZKFTM&_nc_ht=scontent.fsgn16-1.fna&oh=00_AfDubYTudIHbqr4WJGjR0BLNRbImdHSmrCVmg1kdmiBNxw&oe=65E9826C",
        date: "2023-03-03 18:30:29",
        star: 4,
        content:
          "Sản phẩm xứng đáng với số tiền bỏ ra, tuy nhiên gói quà chưa được tốt",
        imgCmt: [
          {
            url: "https://otherstyle.vn/wp-content/uploads/2021/11/ao-polo-nam-trang-co-phoi-soc-02.jpg",
          },
        ],
      },
      {
        userName: "Phú Thành",
        avatar:
          "https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-6/402620919_358162883406972_8835788119796631121_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGrlQPVBV6AsMju-wTS_wO_zXnRQJfcj3_NedFAl9yPfxqTfszm37HSg55WsAgi_z2UTQPQgnAqnh42SdfGGnc4&_nc_ohc=haowL0MqsKoAX_ZKFTM&_nc_ht=scontent.fsgn16-1.fna&oh=00_AfDubYTudIHbqr4WJGjR0BLNRbImdHSmrCVmg1kdmiBNxw&oe=65E9826C",
        date: "2023-03-03 18:30:29",
        star: 2,
        content: "Sản phẩm làm tôi quá thất vọng",
        imgCmt: [
          {
            url: "https://otherstyle.vn/wp-content/uploads/2021/11/ao-polo-nam-trang-co-phoi-soc-02.jpg",
          },
          {
            url: "https://maxi.vn/wp-content/uploads/2022/05/z3436386353722_a0969a6f6e0014ef86a410949b746542-650x845.jpg",
          },
          {
            url: "https://maxi.vn/wp-content/uploads/2022/05/z3436386353722_a0969a6f6e0014ef86a410949b746542-650x845.jpg",
          },
          {
            url: "https://maxi.vn/wp-content/uploads/2022/05/z3436386353722_a0969a6f6e0014ef86a410949b746542-650x845.jpg",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    category: "man",
    type: "Áo sơ mi",
    name: "Áo thun nam Polo",
    size: [{ itemSize: "S" }, { itemSize: "Xl" }],
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
    date: "2024-02-02",
    material: [{ itemMat: "Vải" }, { itemMat: "Coton" }],
    isOnSales: {
      status: true,
      discount_rate: 25,
      price_sale: 330000,
      start_date: "2024-03-12", // Corrected datetime format
      end_date: "2024-03-16",
    },
  },
];

export const brandingData = [
  {
    id: 1,
    title: "Miễn phí giao hàng",
    Description: "Từ đơn hàng 2 triệu",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H5.63636V24.1818H35"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M34.9982 1H11.8164V18H34.9982V1Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M11.8164 7.18164H34.9982"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Ưu đãi mỗi ngày",
    Description: "Giảm giá lên đến 25%",
    icon: (
      <svg
        width="32"
        height="34"
        viewBox="0 0 32 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M30.7 2L29.5 10.85L20.5 9.65"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Dễ dàng tiếp cận",
    Description: "Giá ưu đãi",
    icon: (
      <svg
        width="32"
        height="35"
        viewBox="0 0 32 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M16 28V22"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Chính sách bảo mật",
    Description: "100% bảo vệ thông tin thanh toán",
    icon: (
      <svg
        width="32"
        height="38"
        viewBox="0 0 32 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
          stroke="#FFBB38"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
];

export const blogData = [
  {
    id: 1,
    name: "Những điều cần biết ",
    img: "https://routine.vn/media/magefan_blog/cach-phan-biet-cac-loai-quan-tay-nam.jpg",
    created_at: "2024-02-19",
    description:
      "Luôn là sản phẩm Top of mind và là sự ưu tiên hàng đầu của tất cả các quý ông thời thượng, quần tây nam là một trong những trang phục tượng trưng cho vẻ đẹp lịch lãm, phong cách, lãng tử - một sự lựa chọn lý tưởng nên có trong tủ quần áo của nam giới đang theo đuổi phong cách formal.Theo thời gian, những thiết kế quần tây dành cho nam giới ngày đã trở nên đa dạng, không chỉ dừng lại những kiểu ống suông, ống ôm cơ bản, mà còn có thêm các chi tiết hiện đại như xếp ly, phối thun, cut-out táo bạo,... không thua kém kiểu dáng quần của chị em phụ nữ.Để hiểu rõ hơn về chiếc quần tây, cách phối quần tây dành cho nam cũng như cách phân biệt các loại quần tây nam phổ biến nhất hiện nay, mời bạn theo dõi tiếp bài viết sau đây!",
  },
  {
    id: 2,
    name: "Những điều cần biết và cách phân biệt các loại quần tây nam từ A - Z",
    img: "https://routine.vn/media/amasty/webp/wysiwyg/banner_web-06_jpg.webp",
    created_at: "2024-02-20",
    description:
      "Luôn là sản phẩm Top of mind và là sự ưu tiên hàng đầu của tất cả các quý ông thời thượng, quần tây nam là một trong những trang phục tượng trưng cho vẻ đẹp lịch lãm, phong cách, lãng tử - một sự lựa chọn lý tưởng nên có trong tủ quần áo của nam giới đang theo đuổi phong cách formal.Theo thời gian, những thiết kế quần tây dành cho nam giới ngày đã trở nên đa dạng, không chỉ dừng lại những kiểu ống suông, ống ôm cơ bản, mà còn có thêm các chi tiết hiện đại như xếp ly, phối thun, cut-out táo bạo,... không thua kém kiểu dáng quần của chị em phụ nữ.Để hiểu rõ hơn về chiếc quần tây, cách phối quần tây dành cho nam cũng như cách phân biệt các loại quần tây nam phổ biến nhất hiện nay, mời bạn theo dõi tiếp bài viết sau đây!",
  },
  {
    id: 3,
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
