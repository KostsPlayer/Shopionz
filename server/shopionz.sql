-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Des 2023 pada 14.13
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopionz`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `date_available` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `name`, `date_available`) VALUES
(1, 'Handphone dan Tablet', '2023-12-13 18:41:18'),
(2, 'Laptop', '2023-12-13 18:41:32'),
(3, 'Fashion Pria', '2023-12-13 18:42:21'),
(4, 'Fashion Wanita', '2023-12-13 18:42:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `icon` varchar(128) NOT NULL,
  `url` varchar(64) NOT NULL,
  `is_active` int(11) NOT NULL,
  `date_available` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `menu`
--

INSERT INTO `menu` (`id`, `name`, `icon`, `url`, `is_active`, `date_available`) VALUES
(1, 'Dashboard', 'dashboard', 'dashboard', 1, '2023-11-12 17:09:02'),
(2, 'Menu Manajement', 'folder', 'menu-manajement', 1, '2023-11-12 19:27:58'),
(3, 'Store', 'store', 'store', 1, '2023-12-13 17:42:03'),
(4, 'Sales', 'shoppingmode', 'sales', 1, '2023-11-12 17:09:02'),
(5, 'Category', 'category', 'category', 1, '2023-12-13 18:38:11'),
(26, 'home', 'home', 'home', 1, '2023-12-13 16:49:44'),
(28, 'test update1', 'close', 'test', 1, '2023-12-14 12:32:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shipping_method_id` int(11) DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `date_available` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `shipping_method_id`, `payment_method_id`, `date_available`) VALUES
(1, 6, 1, 1, '2023-12-16 18:19:51'),
(2, 6, 2, 2, '2023-12-16 19:40:10'),
(3, 6, 2, 2, '2023-12-16 19:42:17'),
(4, 6, 1, 2, '2023-12-16 19:47:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders_detail`
--

CREATE TABLE `orders_detail` (
  `id` int(11) NOT NULL,
  `orders_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `address` text DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `orders_detail`
--

INSERT INTO `orders_detail` (`id`, `orders_id`, `product_id`, `amount`, `address`, `phone_number`) VALUES
(1, 1, 37, 1, 'Test', '082334100715'),
(2, 3, 36, 1, 'Test', '082334100715'),
(3, 4, 36, 5, 'Test', '082334100715');

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `date_available` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `payment_method`
--

INSERT INTO `payment_method` (`id`, `name`, `date_available`) VALUES
(1, 'BNI', '2023-12-16 14:00:34'),
(2, 'BCA', '2023-12-16 14:00:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `user_email` varchar(96) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `images` varchar(256) NOT NULL,
  `date_available` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `user_email`, `name`, `description`, `price`, `stock`, `category_id`, `images`, `date_available`) VALUES
(34, 'azka@gmail.com', 'test', 'test', 10000, 1, 4, 'Feed IG.png', '2023-12-14 08:18:05'),
(36, 'azka@gmail.com', 'image1', 'none', 10000, 100, 4, '2.jpg', '2023-12-14 08:24:03'),
(37, 'azka@gmail.com', 'image2', 'none', 10000, 100, 4, '3.jpg', '2023-12-14 08:24:13'),
(38, 'azka@gmail.com', 'image3', 'none', 10000, 100, 4, '4.jpg', '2023-12-14 08:24:21'),
(39, 'azka@gmail.com', 'image4', 'none', 10000, 100, 4, '5.jpg', '2023-12-14 08:24:32'),
(40, 'azka@gmail.com', 'image5', 'none', 10000, 100, 4, '6.jpg', '2023-12-14 08:24:43'),
(41, 'azka@gmail.com', 'image6', 'none', 10000, 100, 4, '7.jpg', '2023-12-14 08:24:50'),
(50, 'azka@gmail.com', 'test', 'apalah', 200000, 100, 3, '2.jpg', '2023-12-15 00:50:37');

-- --------------------------------------------------------

--
-- Struktur dari tabel `shipping_method`
--

CREATE TABLE `shipping_method` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `date_available` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `shipping_method`
--

INSERT INTO `shipping_method` (`id`, `name`, `date_available`) VALUES
(1, 'REGULAR', '2023-12-16 13:59:23'),
(2, 'FAST', '2023-12-16 13:59:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `shopping_cart`
--

CREATE TABLE `shopping_cart` (
  `id` int(11) NOT NULL,
  `user_email` varchar(96) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `date_available` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `shopping_cart`
--

INSERT INTO `shopping_cart` (`id`, `user_email`, `product_id`, `amount`, `status`, `date_available`) VALUES
(5, 'test@gmail.com', 38, 2, 1, '2023-12-14 22:09:52'),
(8, 'nuril@gmail.com', 39, 5, 1, '2023-12-16 09:32:02'),
(9, 'test@gmail.com', 37, 3, 0, '2023-12-16 09:48:41'),
(10, 'test@gmail.com', 41, 1, 1, '2023-12-16 15:45:16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(96) NOT NULL,
  `name` varchar(128) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `password` varchar(128) NOT NULL,
  `image` varchar(256) NOT NULL DEFAULT '2.jpg',
  `date_available` datetime NOT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `phone_number`, `address`, `password`, `image`, `date_available`, `role_id`) VALUES
(6, 'test@gmail.com', 'Test', NULL, NULL, '$2b$10$l1.vhoZ9pkiKRTCCKiEwreyqyHCuJPTd65VYzmNLaB1dhIEVFNiWy', '2.jpg', '2023-11-11 09:13:00', 3),
(7, 'nuril@gmail.com', 'Nuril', NULL, NULL, '$2b$10$6zMmOf3rIx8nVaVLxQxim.Z0vvd3LvEZODcinhf6CvKn8cqLAAnLi', '2.jpg', '2023-11-11 09:21:20', 3),
(47, 'azka@gmail.com', 'KostsPlayer', NULL, NULL, '$2b$10$a0Z8E0GqnW7nA/wYUIO1beY1wLjRn12VBOiXXwcl6bx/uHTi4ZtfC', '2.jpg', '2023-11-11 17:00:57', 2),
(64, 'adaf@gmail.com', '1qaaz', NULL, NULL, '$2b$10$UMB8ykDs1Akpdly2iIy63uMN.Cw4/9gb9zl6LUILShGT/sDRH9Fnm', '2.jpg', '2023-11-12 07:52:47', NULL),
(65, 'gaga@gmail.com', 'saf', NULL, NULL, '$2b$10$XBXAJvQbC6AucEe/m.0AK.5zcnG3YchP2YMmk5gbBUYoz9q1q7HLG', '2.jpg', '2023-11-12 07:55:45', NULL),
(66, '1qasw@gmail.com', '1qazxsw2', NULL, NULL, '$2b$10$K5j/WRWH/5qF6f.ns6YbKeQYI/nBgZjoI3kAtISU7aSIlpbapSrf.', '2.jpg', '2023-11-12 07:58:25', NULL),
(67, 'safaz@gmail.com', 'saff', NULL, NULL, '$2b$10$aFzOY2QkmsCQTlhig4RQv.UlfUhyHKDTKAK8RyIOz3Fg17VWPorli', '2.jpg', '2023-11-12 07:58:58', 2),
(68, 'gagag@gmail.com', 'safaga', NULL, NULL, '$2b$10$5JWH6sILyCMCnSfUnRdF6eTnXAl0ste3t.0URVPjvOP5DXET0lYBW', '2.jpg', '2023-11-12 08:00:01', 2),
(69, 'aw@gmail.com', 'aff', NULL, NULL, '$2b$10$zr/g22h8zYl9h7AU9qI7y.8VTzKnt0Di97rsrTQAuACUAdsB2IAhW', '2.jpg', '2023-11-12 08:24:31', 3),
(70, 'waa@gmail.com', 'safaf', NULL, NULL, '$2b$10$kid037F0WkY7m4/AhmwCgu9zs9Dludh4ePYTuZXBdroruWtoovY9y', '2.jpg', '2023-11-12 08:40:42', 2),
(71, 'fasgwg@gmail.com', 'safa', NULL, NULL, '$2b$10$p6QIDD1cs8d7YoHUMFboD.CgSK1k4FJskPx/0WiF3casct.VEpi3C', '2.jpg', '2023-11-12 09:10:49', 2),
(72, 'afq@gmail.com', 'fasf', NULL, NULL, '$2b$10$k7Jz0u7nMZBYm/3.u3G/kO5s2WqwF0gMAxHjtsksn/GG2UhLfZgTS', '2.jpg', '2023-11-13 14:29:58', 2),
(73, 'po@gmail.com', 'test', NULL, NULL, '$2b$10$jP9x3rBJEWVHkcBNjZcyD.z22UKQ17KHhE/CvesgCviLO2MRi6SRK', '2.jpg', '2023-12-12 11:37:31', NULL),
(74, 'wafa@gmail.com', 'saf', NULL, NULL, '$2b$10$bcAiC3bcUBpncdBCMgN.fem4bzoCdlPRR7bNEZje8kE.AZ22T2vUK', '2.jpg', '2023-12-12 11:41:23', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users_role`
--

CREATE TABLE `users_role` (
  `id` int(11) NOT NULL,
  `roles` varchar(32) NOT NULL,
  `description` text NOT NULL,
  `date_available` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users_role`
--

INSERT INTO `users_role` (`id`, `roles`, `description`, `date_available`) VALUES
(1, 'administrator', '-', '2023-11-10 15:13:17'),
(2, 'seller', '-', '2023-11-10 16:04:24'),
(3, 'buyer', '-', '2023-11-10 16:04:24');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipping_method_id` (`shipping_method_id`),
  ADD KEY `payment_method_id` (`payment_method_id`),
  ADD KEY `fk_user_order` (`user_id`);

--
-- Indeks untuk tabel `orders_detail`
--
ALTER TABLE `orders_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_detail_orders` (`orders_id`),
  ADD KEY `fk_orders_detail_product` (`product_id`);

--
-- Indeks untuk tabel `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indeks untuk tabel `shipping_method`
--
ALTER TABLE `shipping_method`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product` (`product_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_role` (`role_id`);

--
-- Indeks untuk tabel `users_role`
--
ALTER TABLE `users_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `orders_detail`
--
ALTER TABLE `orders_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT untuk tabel `shipping_method`
--
ALTER TABLE `shipping_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `shopping_cart`
--
ALTER TABLE `shopping_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT untuk tabel `users_role`
--
ALTER TABLE `users_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_user_order` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`shipping_method_id`) REFERENCES `shipping_method` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`);

--
-- Ketidakleluasaan untuk tabel `orders_detail`
--
ALTER TABLE `orders_detail`
  ADD CONSTRAINT `fk_orders_detail_orders` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `fk_orders_detail_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Ketidakleluasaan untuk tabel `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Ketidakleluasaan untuk tabel `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_role` FOREIGN KEY (`role_id`) REFERENCES `users_role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
