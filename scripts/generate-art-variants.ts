import fs from 'node:fs/promises';
import path from 'node:path';
import RunwayML from '@runwayml/sdk';

const OUTPUT_DIR = path.join(
	import.meta.dirname,
	'..',
	'public',
	'generated',
	'variants',
);

const CONTRIBUTION_CONTEXT = [
	'The composition varies in density from section to section:',
	'dense clusters in some areas, sparse scattered elements in others,',
	'with a couple of nearly empty zones.',
].join(' ');

const VARIANTS: Array<{ name: string; prompt: string }> = [
	{
		name: '01-rings-and-pegs',
		prompt: [
			'Flat graphic generative art. Circles of varying sizes connected by thin lines wrapping around pegs.',
			'Concentric rings nest inside larger circles. Lines thread between them like string art on a board.',
			CONTRIBUTION_CONTEXT,
			'Color palette: black, white, teal. Flat solid fills, hard edges, no gradients, no shadows.',
			'Clean vector quality. Feels like a computational diagram or data structure made beautiful.',
			'No text, no frame.',
		].join(' '),
	},
	{
		name: '02-dot-matrix',
		prompt: [
			'Flat graphic art. A grid of dots where each dot varies in size based on an underlying data pattern.',
			'Some dots are large and bold, others are tiny pinpoints, some cells are empty.',
			'The dots form a 12-column by 7-row matrix, like a calendar or contribution chart reimagined.',
			CONTRIBUTION_CONTEXT,
			'Color palette: black background, white and teal dots of varying sizes.',
			'Perfectly clean, minimal, geometric. Like a halftone print or punch card.',
			'No text, no frame, no gradients.',
		].join(' '),
	},
	{
		name: '03-topographic',
		prompt: [
			'Flat graphic generative art using topographic contour lines.',
			'Concentric irregular closed curves nest inside each other like elevation lines on a map.',
			'Dense areas have many tightly packed lines. Sparse areas have few, widely spaced lines.',
			CONTRIBUTION_CONTEXT,
			'Color: thin teal lines on a white background, with occasional black filled regions at the peaks.',
			'Clean vector aesthetic, uniform line weight, no fills except at peaks. Feels like terrain data.',
			'No text, no frame, no gradients, no shadows.',
		].join(' '),
	},
	{
		name: '04-circuit-network',
		prompt: [
			'Flat graphic art resembling a circuit board or network graph.',
			'Nodes of varying sizes connected by straight horizontal and vertical lines with right-angle turns.',
			'Some nodes are filled circles, others are hollow rings. Junction points have small squares.',
			CONTRIBUTION_CONTEXT,
			'Color palette: dark charcoal background, teal and white elements.',
			'Precise, technical, clean. Like a PCB layout or microchip diagram made into art.',
			'No text, no frame, no gradients, no 3D.',
		].join(' '),
	},
	{
		name: '05-bauhaus-blocks',
		prompt: [
			'Flat graphic generative art in a Bauhaus-inspired geometric style.',
			'Composition of rectangles, circles, and triangles arranged in a grid structure.',
			'Some cells are densely filled with overlapping shapes, others contain a single small element.',
			CONTRIBUTION_CONTEXT,
			'Color palette: primarily black and white with bold teal and warm coral accents on select shapes.',
			'Strong graphic design sensibility. Asymmetric balance. Hard edges, flat fills.',
			'Feels like a modernist poster or stamp. No text, no frame.',
		].join(' '),
	},
];

async function downloadImage(url: string, dest: string) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Failed to download: ${response.status}`);
	const buffer = await response.arrayBuffer();
	await fs.writeFile(dest, Buffer.from(buffer));
}

async function generate(variant: { name: string; prompt: string }) {
	const client = new RunwayML();

	console.log(`\n🎨 [${variant.name}] Generating...`);
	console.log(`   Prompt: ${variant.prompt.slice(0, 120)}...`);

	const task = client.textToImage.create({
		model: 'gen4_image',
		promptText: variant.prompt,
		ratio: '1080:1080',
	});

	const result = await task.waitForTaskOutput();
	const imageUrl = result.output[0];

	const dest = path.join(OUTPUT_DIR, `${variant.name}.webp`);
	await downloadImage(imageUrl, dest);
	console.log(`   ✅ Saved: ${dest}`);
}

async function main() {
	await fs.mkdir(OUTPUT_DIR, { recursive: true });

	console.log(`Generating ${VARIANTS.length} variants...\n`);

	for (const variant of VARIANTS) {
		try {
			await generate(variant);
		} catch (error) {
			console.error(`   ❌ [${variant.name}] Failed:`, error);
		}
	}

	console.log('\n🎉 Done! Check public/generated/variants/');
}

main().catch((error) => {
	console.error('Fatal:', error);
	process.exit(1);
});
