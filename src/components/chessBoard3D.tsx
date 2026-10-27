"use client";

import { ChessPiece } from "@/types/chess";

interface ChessBoard3DProps {
	pieces: ChessPiece[];
}

export default function ChessBoard3D({pieces}: ChessBoard3DProps){
	return (
		<div className="w-[480px] h-[480px] border border-border rounded-lg flex items-center justify-center bg-slate-950 text-slate-200">
      		<p className="text-sm">3D Canvas Placeholder (React Three Fiber)</p>
    	</div>
	);
}
