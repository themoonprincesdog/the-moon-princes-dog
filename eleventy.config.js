import markdownIt from "markdown-it";
import Nunjucks from "nunjucks";
import fg from "fast-glob";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

const galleryImages = fg.sync(['**/images/*.webp', '!**/_site']);

export default async function(eleventyConfig) {
	// Configure Eleventy
    eleventyConfig.addPassthroughCopy("bundle.css");
	eleventyConfig.addPassthroughCopy("assets");

	eleventyConfig.addPlugin(eleventyImageTransformPlugin);

	let nunjucksEnvironment = new Nunjucks.Environment(
		new Nunjucks.FileSystemLoader("_includes")
	);

	eleventyConfig.setLibrary("njk", nunjucksEnvironment);

	//Create collection of gallery images
	eleventyConfig.addCollection('gallery', function(collection) {
		return galleryImages;
	});

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "chapter", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "The Moon Prince's Dog",
			subtitle: "A sci-fi light web novel about a girl who is a prince and a girl who is her dogfighter.",
			base: "http://localhost/",
			// base: "https://moonprince.net/",
			author: {
				name: "cowboysneepdip & ludowoods",
				email: "", // Optional
			}
		}
	});

	// Markdown options
    let options = {
		html: true,
		breaks: true,
		linkify: true,
	};

	eleventyConfig.setLibrary("md", markdownIt(options));
};