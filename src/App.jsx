import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import logo from "./assets/img/logo.png";
import logoApple from "./assets/img/logoApple.png";
import logoGoogle from "./assets/img/logoGoogle.png";

const App = () => {
	const [data, setData] = useState([]);
	const [buscarPelicula, setBuscarPelicula] = useState("");
	const [paginacion, setPaginacion] = useState({
		pagina: 1,
		desde: 0,
		hasta: 10,
	});
	const [paginaActual, setPaginaActual] = useState(1);
	const cadaPagina = 10;

	const baseURL =
		"https://static.rviewer.io/challenges/datasets/dreadful-cherry-tomatoes/data.json";
	const traerData = async () => {
		const res = await axios.get(baseURL);
		const fullData = res.data.entries;
		setData(fullData);
		console.log(fullData);
	};

	useEffect(() => {
		traerData();
	}, []);

	const handleChange = (e) => {
		setBuscarPelicula(e.target.value);
	};

	const filterMovies = data.filter((movie) =>
		movie.title.toLowerCase().includes(buscarPelicula.toLowerCase())
	);

	const handlePaginacion = (numero) => {
		setPaginacion({
			pagina: numero,
			desde: numero * cadaPagina - cadaPagina,
			hasta: numero * cadaPagina,
		});
		setPaginaActual(numero);
	};

	const pages = [
		{ id: 1, numero: 1 },
		{ id: 2, numero: 2 },
		{ id: 3, numero: 3 },
	];

	return (
		<div
			style={{
				width: "100%",
				minHeight: "100vh",
			}}
		>
			<div
				className='cabezal'
				style={{
					display: "flex",
					alignItems: "center",
					fontWeight: 700,
					fontSize: "24px",
					background: "#000",
					padding: "4px 0",
				}}
			>
				<div
					style={{
						width: "100%",
						maxWidth: 1280,
						margin: "0 auto",
						padding: "0 1rem",
					}}
				>
					<a href='/'>
						<img src={logo} height='40' alt='' />
					</a>
				</div>
			</div>
			<nav
				style={{
					background: "#C42521",
					padding: ".5rem 0",
					position: "sticky",
					top: "0",
					zIndex: 1000,
				}}
			>
				<div
					style={{
						width: "100%",
						maxWidth: 1280,
						margin: "0 auto",
						padding: "0 1rem",
					}}
				>
					<input
						type='text'
						placeholder='Buscar peli'
						value={buscarPelicula}
						onChange={handleChange}
						style={{
							width: "100%",
							border: "none",
							background: "#fff",
							color: "#000",
							padding: ".45rem",
							borderRadius: ".5rem",
							outline: "none",
						}}
					/>
				</div>
			</nav>
			<h1
				style={{
					width: "100%",
					maxWidth: 1280,
					margin: "1rem auto",
					padding: "0 1rem",
					fontSize: "2.25rem",
				}}
			>
				{buscarPelicula
					? `Resultados de: ${buscarPelicula}`
					: "Peliculas populares"}
			</h1>
			<div
				className='grid'
				style={{
					display: "grid",
					gap: "1rem",
					gridTemplateColumns:
						"repeat(auto-fill, minmax(210px, 1fr))",
					width: "100%",
					maxWidth: 1280,
					margin: "0 auto",
					padding: "0 1rem",
				}}
			>
				{buscarPelicula.length > 0
					? filterMovies?.map((data, i) => (
							<Card key={i} data={data} />
					  ))
					: data
							.slice(paginacion.desde, paginacion.hasta)
							.map((data, i) => <Card key={i} data={data} />)}
			</div>

			{!buscarPelicula && (
				<div className='paginacion'>
					{pages.map((page) => (
						<button
							key={page.id}
							onClick={() => handlePaginacion(page.numero)}
							className='btnCustom'
							style={{
								opacity: paginaActual !== page.numero && 0.5,
							}}
						>
							{page.numero}
						</button>
					))}
				</div>
			)}
			<footer className='footer'>
				<img src={logo} height='40' alt='' />
				<div className='logos'>
					<img src={logoApple} height='40' alt='' />
					<img src={logoGoogle} height='40' alt='' />
				</div>
				<p className='textfoot'>
					© 2022 Todos los derechos reservados. Desarrollado por
					Rodrigo Valer
				</p>
			</footer>
		</div>
	);
};

export default App;
