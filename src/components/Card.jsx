const Card = ({ data }) => {
	return (
		<div
			className='card'
			style={{
				cursor: "pointer",
				position: "relative",
			}}
		>
			<img
				src={data.images.posterArt.url}
				alt='imagen de pelicula'
				style={{
					width: "100%",
					height: "100%",
				}}
			/>
			<div
				className='infomasna'
				style={{
					position: "absolute",
					width: "100%",
					bottom: 0,
					left: 0,
					padding: "1rem .5rem",
					background: "#000",
				}}
			>
				<h3
					style={{
						fontSize: "1rem",
						margin: "0",
					}}
				>
					{data.title}
				</h3>
				<div className='infocausa'>
					<p>{data.releaseYear}</p>
					<p>{data.description}</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
