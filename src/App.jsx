import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import data from "./assets/data.json";
import addToCart from "./assets/images/icon-add-to-cart.svg";
import carbonNeutral from "./assets/images/icon-carbon-neutral.svg";
import decrement from "./assets/images/icon-decrement-quantity.svg";
import increment from "./assets/images/icon-increment-quantity.svg";
import orderConfirm from "./assets/images/icon-order-confirmed.svg";
import removeItem from "./assets/images/icon-remove-item.svg";
import emptyCart from "./assets/images/illustration-empty-cart.svg";

function App() {
	const [cartCount, setCartCount] = useState({});
	const [confirm, setConfirm] = useState(false);
	// console.log(cartCount);

	const incrementQuantity = (itemName) => {
		setCartCount((prev) => {
			const newCartCount = { ...prev };

			if (itemName in newCartCount) {
				newCartCount[itemName].quantity += 1; // Increment quantity
			}

			return newCartCount;
		});
	};

	const decrementQuantity = (itemName) => {
		setCartCount((prev) => {
			const newCartCount = { ...prev };

			if (itemName in newCartCount && newCartCount[itemName].quantity > 1) {
				newCartCount[itemName].quantity -= 1; // Decrement quantity
			} else {
				delete newCartCount[itemName]; // Optionally, remove the item if the quantity is 0
			}

			return newCartCount;
		});
	};

	const addItemToCart = (item) => {
		setCartCount((prev) => {
			const newCartCount = { ...prev }; // Copy the previous state

			newCartCount[item.name] = {
				quantity: 1,
				eachPrice: item.price,
				thumbNail: item.image.thumbnail,
			};

			return newCartCount; // Return the updated state
		});
	};

	const countTotal = () => {
		let totalPrice = 0;
		Object.keys(cartCount).map((item) => {
			totalPrice += cartCount[item].quantity * cartCount[item].eachPrice;
		});

		// console.log(totalPrice);
		return totalPrice.toFixed(2);
	};

	// console.log(cart);

	return (
		<div className="flex flex-col justify-center items-center m-auto relative">
			<div className="container px-6 grid grid-cols-1 lg:grid-cols-[3fr_350px] justify-center gap-8 py-6">
				<div className="flex flex-col gap-8">
					<header className="text-4xl font-bold ">Desserts</header>
					<div
						id="prod-list"
						className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:col-start-1 justify-center m-auto"
					>
						{data.map((item) => (
							<div id={item.name}>
								<section className="relative mb-5">
									<picture>
										<source
											srcset={item.image.mobile}
											media="(max-width: 400px)"
										/>
										<source
											srcset={item.image.tablet}
											media="(max-width: 800px)"
										/>
										<source
											srcset={item.image.desktop}
											media="(min-width: 801px)"
										/>
										<img
											src={item.image.thumbnail}
											alt=""
											className={`rounded-xl ${
												item.name in cartCount ? "ring-4 ring-red-500" : ""
											}`}
										/>
									</picture>
									<div className="-mt-6 text-center p-0 relative ">
										{item.name in cartCount ? (
											<div className="-mt-6 w-2/3 px-6 py-2 rounded-full flex justify-between m-auto  bg-red-500 ">
												<button
													className="ring-1 ring-white rounded-full px-2"
													onClick={() => decrementQuantity(item.name)}
												>
													<img src={decrement} alt="" className="w-2" />
												</button>
												<div className="text-white">
													{/* {cartCount.find((e) => e.key === item.name)?.quantity ||
														"count"} */}
													{cartCount[item.name].quantity}
												</div>
												{/* <div className="text-white"></div> */}
												<button
													className="ring-1 ring-white rounded-full px-2 "
													onClick={() => incrementQuantity(item.name)}
												>
													<img src={increment} alt="" className="w-2" />
												</button>
											</div>
										) : (
											<button
												className="w-2/3 bg-white rounded-full px-6 py-2 ring-1 ring-rose-300"
												onClick={() => addItemToCart(item)}
											>
												<span className=" flex gap-2 items-center justify-center font-semibold text-sm text-gray-800">
													<img src={addToCart} alt="" />
													Add to Cart
												</span>
											</button>
										)}
									</div>
								</section>
								<div>
									<div className="text-sm opacity-40">{item.category}</div>
									<div className="text-lg font-semibold">{item.name}</div>
									<div className="text-lg font-bold text-red-500">
										&#36;{item.price.toFixed(2)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div
					id="cart"
					className="bg-white p-5 rounded-xl m-auto lg:mt-0 w-[350px] lg:w-full "
				>
					<header className="text-start font-bold text-2xl text-red-500 mb-3">
						Your Cart
					</header>
					{Object.keys(cartCount).length === 0 && (
						<div>
							<img src={emptyCart} alt="" className="m-auto my-8" />
							<p className="text-center text-sm opacity-50">
								Your added items will appear here
							</p>
						</div>
					)}
					{Object.keys(cartCount).length > 0 && (
						<div className="flex flex-col gap-5">
							{Object.keys(cartCount).map((e) => (
								<div className="flex justify-between items-center border-b-2 py-2 ">
									<div>
										<div className="text-sm font-semibold opacity-80">{e}</div>
										<div className="flex gap-5 justify-start items-end">
											<span className="text-rose-700 opacity-60 text-sm">
												{cartCount[e].quantity}x
											</span>
											<span className="text-sm text-rose-900 opacity-50">
												&#64; &#36;{cartCount[e].eachPrice}
											</span>
											<span className="text-sm font-bold text-rose-900 opacity-50">
												&#36;
												{(
													cartCount[e].quantity * cartCount[e].eachPrice
												).toFixed(2)}
											</span>
										</div>
									</div>
									<button
										className="ring-1 rounded-full ring-rose-700 opacity-20"
										onClick={() => {
											setCartCount((prev) => {
												let newcart = { ...prev };
												delete newcart[e];
												return newcart;
											});
										}}
									>
										<img src={removeItem} alt="" className="p-1" />
									</button>
								</div>
							))}
							<div className="flex justify-between items-start">
								<span className="text-sm">Order Total</span>
								<span className="font-bold text-2xl">&#36;{countTotal()}</span>
							</div>
							<div className="bg-gray-100 rounded-md flex px-5 py-3 justify-center">
								<img src={carbonNeutral} alt="" className="px-2" />
								<p className="text-sm">
									This is a<span className="font-semibold">carbon-neutral</span>
									delivery.
								</p>
							</div>
							<button
								className="text-lg font-semibold bg-red-500 text-white rounded-full py-3"
								onClick={() => {
									setConfirm((prev) => !prev);
								}}
							>
								Confirm Order
							</button>
						</div>
					)}
				</div>
				{confirm && (
					<div
						id="confirm"
						className="fixed bottom-0 overflow-y-auto md:bottom-auto md:top-32 md:rounded-xl w-full md:w-[480px] mt-20 md:h-auto inset-0 md:m-auto  bg-white rounded-t-xl p-8 z-[999] pointer-events-auto"
					>
						<img src={orderConfirm} alt="" className="py-5 mr-auto" />
						<section className="mb-10 w-full">
							<header className="font-bold text-5xl leading-tight mb-3 md:text-3xl">
								Order Confirmed
							</header>
							<p className="text-rose-800 opacity-55">
								We hope you enjoy your food!
							</p>
						</section>
						<div className="p-5 bg-amber-50 rounded-md md:w-full">
							{Object.keys(cartCount).map((e) => (
								<div className="flex justify-start gap-5 items-center border-b-2 py-4 ">
									<img
										src={cartCount[e].thumbNail}
										alt=""
										className="rounded-lg w-14"
									/>
									<div>
										<div className="text-sm font-semibold opacity-80">{e}</div>
										<div className="flex gap-5 justify-start items-end">
											<span className="text-rose-700 opacity-60 text-sm">
												{cartCount[e].quantity}x
											</span>
											<span className="text-sm text-rose-900 opacity-50">
												&#64; &#36;{cartCount[e].eachPrice}
											</span>
										</div>
									</div>
									<span className="text-sm font-bold text-rose-900 opacity-50 ml-auto">
										&#36;
										{(cartCount[e].quantity * cartCount[e].eachPrice).toFixed(
											2
										)}
									</span>
								</div>
							))}
							<div className="flex justify-between items-start mt-5">
								<span className="text-sm">Order Total</span>
								<span className="font-bold text-2xl">&#36;{countTotal()}</span>
							</div>
						</div>

						<button
							className="bg-red-500 py-3 w-full my-5 rounded-full text-white font-semibold "
							onClick={() => {
								setCartCount({});
								setConfirm((prev) => !prev);
							}}
						>
							Start New Order
						</button>
					</div>
				)}
			</div>
			{confirm && (
				<div className="z-[990] w-full h-full absolute inset-0 bg-black opacity-50"></div>
			)}
			<div className="text-sm text-center m-auto">
				Challenge by
				<a href="https://www.frontendmentor.io?ref=challenge">
					Frontend Mentor
				</a>
				. Coded by <a href="#">Min Khant Kyaw</a>.
			</div>
		</div>
	);
}

export default App;
