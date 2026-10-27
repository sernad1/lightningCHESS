"use client";

import Link from "next/link";

export default function Home() {
	return (
		<div>
			<h1 className="text-4xl font-bold">Lightning Chess</h1>	
			<Link href="/chess">Play Chess</Link>
		</div>
	);
}
