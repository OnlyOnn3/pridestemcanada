"use client";
export default function HomePage() {
	let sections = [
		{
			id: "description",
			title: "Who are we?",
			body: "Hello! This is some text informing you about the Pride STEM conference and the organization behind it!"
		},
		{
			id: "info",
			title: "More Information",
			body: "This is where we have more information about Pride STEM."
		},
		{
			id: "contact",
			title: "Unspecified",
			body: "Unspecified body text."
		}
	]
	return (
		<div className="container py-5">
			<div className="d-flex flex-row justify-content-around mx-auto">
				<div className="conainer px-3">
					<TextSection section={sections[0]} />
				</div>
				{/* Picture Element is WIP */}
				<picture>
					<source media="(min-width:600px)" srcSet="https://placehold.co/600x400" />
					<source media="(min-width:1080px)" srcSet="https://placehold.co/1080x720" />
					<source media="(min-width:1920px)" srcSet="https://placehold.co/1920x1080" />
					<img src="https://placehold.co/600x400" className="img-fluid" />
				</picture>
			</div>
			<TextSection section={sections[1]} />
			<TextSection section={sections[2]} />
		</div>
	);
}

function TextSection({section}) {
	return (
		<section className="py-3">
			<p className="h2 pride-gradient w-100 fw-semibold rounded-3 pb-5 text-center">{section.title}</p>
			<p className="p-2 text-dark shadow-sm collapse-content">{section.body}</p>
		</section>
	);
}