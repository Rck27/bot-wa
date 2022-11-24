const wweb = require("whatsapp-web.js");
const parser = require("yargs-parser");
const { Buttons } = wweb;

function getButton(items) {
	return new Promise((resolve) => {
		try {
			var rows = [];
			const argv = parser(items);

			items.includes(" ") ? items.split(" ") : [items];

			var msgTitle = argv.title ?? "Choose";
			var msgDescription = argv.cap ?? "Select one option from the list";
			var PopTitle = argv.pop ?? "Available Options:";

			if (argv._) {
				argv._.forEach((elem) => {
					rows.push({
						body: elem.replace(/_/g, " "),
					});
				});
			}
			const xList = new Buttons(msgDescription, rows, msgTitle, PopTitle);

			resolve(xList);
		} catch (error) {
			return false;
		}
	});
}
module.exports = getButton;
// export default getButton;
