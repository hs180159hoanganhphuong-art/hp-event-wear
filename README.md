# H&P Event Wear Website

Website MVP đa trang, responsive, dùng HTML/CSS/JavaScript thuần.

## Chạy local

```bash
python -m http.server 8080
```
Mở `http://localhost:8080`.

## Các trang
- `index.html` — Trang chủ
- `about.html` — Giới thiệu
- `news.html` / `article.html` — Tin tức
- `ai-studio.html` — H&P AI Studio
- `ai-color.html` — AI Chọn Màu
- `ai-mockup.html` — AI Lên Mockup
- `ai-size.html` — AI Chọn Size
- `ai-fitting.html` — AI Fitting
- `contact.html` — Liên hệ / báo giá

## Tính năng hiện có
- Responsive desktop/mobile, header, search, menu AI dropdown, floating Zalo/Facebook/Call.
- AI Chọn Màu: đọc màu trung bình từ ảnh và gợi ý màu trong palette H&P.
- AI Mockup: upload PNG trước/sau, kéo artwork, chỉnh kích thước/vị trí, cảnh báo file dưới 2000px. `.AI/.PSD` được nhận nhưng cần backend để rasterize preview.
- AI Chọn Size: rule engine dựa trên bảng size và input cơ thể.
- AI Fitting: preview MVP bằng overlay áo trên ảnh người dùng. Virtual try-on photorealistic cần tích hợp backend/API AI.

## Branding
- H&P Event Wear
- Slogan: Wear the Moment. Keep the Memory.
- Brand Orange: `#B8521D`

## AI Studio dạng wizard
`ai-studio.html` chứa cả 4 bước (#color, #mockup, #size, #fitting) với nút Quay lại/Tiếp theo. Bước 02 và 04 có nút tải xuống. Các trang `ai-*.html` cũ tự chuyển hướng về wizard. Logic wizard: `assets/js/studio.js`.

## Phôi áo
Ảnh phôi (đã tách trước/sau, căn chuẩn, WebP) nằm ở `assets/img/blanks/<form>/<mau>-front|back.webp`. Danh sách màu, mã màu và vị trí logo mặc định nằm trong `assets/js/blanks.js`. Thêm màu mới: thêm 2 ảnh và 1 dòng vào `blanks.js`.

## AI Fitting & phông chữ
- AI Fitting ghép áo từ mockup (ảnh phôi đã tách nền `<mau>-cut.webp` + logo khách) lên ảnh khách; Auto Fit dò vai người trong ảnh. Logic nằm cuối `assets/js/app.js`.
- Phông chữ trong `assets/fonts/`: LF Negrita Pro (tiêu đề h1–h6, tên thương hiệu, số liệu) và LF Study Notes (văn bản). Khai báo ở cuối `assets/css/style.css`, đổi qua biến `--font-head` và `--font-body`.

## Triển khai & SEO
- Domain chính: `https://www.hpeventwear.id.vn/` (Vercel tự chuyển `hpeventwear.id.vn` sang `www` nhờ `vercel.json`).
- `robots.txt` và `sitemap.xml` nằm ở thư mục gốc. Khi thêm trang hoặc bài viết mới, thêm địa chỉ vào `sitemap.xml` và cập nhật `lastmod`.
- Mỗi trang có `title`, `description`, `canonical`, Open Graph riêng. Trang bài viết tự đổi theo từng bài trong `assets/js/articles.js`.
- Các trang `ai-color/ai-mockup/ai-size/ai-fitting` chỉ chuyển hướng về AI Studio, đã gắn `noindex`.
