const http = require("http");
const url = require("url");
const { fileRead, fileWrite } = require("./utils/fileUtils");
const PORT = 8888;

let options = {
	"Content-Type": "application/json",
};

http
	.createServer(async (req, res) => {
		let reqId = req.url.split("/")[2];
		if (req.method == "GET") {
			res.writeHead(200, options);
			if (req.url.includes("subcategories")) {
				let subcategories = fileRead("subCategories");
				let products = fileRead("products");
				for (let i = 0; i < subcategories.length; i++) {
					for (let j = 0; j < products.length; j++) {
						if (subcategories[i].subCategoryId == products[j].subCategoryId) {
							subcategories[i]["products"] = products[j];
							delete subcategories[i]["products"].subCategoryId;
							delete subcategories[i].categoryId;
						}
					}
				}
				console.log(subcategories[reqId - 1]);
				if (!reqId) {
					return res.end(JSON.stringify(subcategories));
				}

				return res.end(JSON.stringify(subcategories[reqId - 1]));
			} else if (req.url.includes("categories")) {
				let categories = fileRead("categories");
				let subcategories = fileRead("subCategories");
				for (let i = 0; i < categories.length; i++) {
					for (let j = 0; j < subcategories.length; j++) {
						if (categories[i].category_id == subcategories[j].category_id) {
							categories[i]["subCategories"] = subcategories[j];
							delete categories[i]["subCategories"].categoryId;
						}
					}
				}
				if (!reqId) {
					return res.end(JSON.stringify(categories, null, 2));
				}
				return res.end(JSON.stringify(categories[reqId - 1]));
			} else if (req.url.includes("products")) {
				let products = fileRead("products");
				let query = url.parse(req.url, true).query || {};
				if (reqId) {
					return res.end(JSON.stringify(products[reqId - 1], null, 2));
				}
				if (!query) return res.end("[]");
				let result = [];
				for (let i in products)
					for (let j in query)
						if (products[i][j] == query[j]) result.push(products[i]);
				return res.end(JSON.stringify(result));
			}
		} else if (req.method == "POST") {
			res.writeHead(200, options);
			if (req.url.includes("subcategories")) {
				let subcategories = fileRead("subCategories");
				req.on("data", (data) => {
					data = JSON.parse(data);
					subcategories.push({
						subCategoryId: subcategories.at(-1).subCategoryId + 1,
						...data,
					});
					fileWrite("subCategories", subcategories);
					return res.end("SubCategory Created !!!");
				});
			} else if (req.url.includes("categories")) {
				let categories = fileRead("categories");
				req.on("data", (data) => {
					data = JSON.parse(data);
					categories.push({
						categoryId: categories.at(-1).categoryId + 1,
						...data,
					});
					fileWrite("categories", categories);
					return res.end("Category Created !!!");
				});
			} else if (req.url.includes("products")) {
				let products = fileRead("products");
				req.on("data", (data) => {
					data = JSON.parse(data);
					products.push({
						productId: products.at(-1).productId + 1,
						...data,
					});
					fileWrite("products", products);
					return res.end("Product Created !!!");
				});
			}
		} else if (req.method == "PUT") {
			if (req.url.includes("subcategories")) {
				req.on("data", (data) => {
					let subcategories = fileRead("subCategories");
					data = JSON.parse(data);
					for (let i in subcategories) {
						if (subcategories[i].subCategoryId == reqId) {
							subcategories[i] = {
								...products[i],
								subCategoryId: +reqId,
								...data,
							};
						}
					}
					fileWrite("subCategories", subcategories);
					return res.end("Updated subcategories !!!");
				});
			} else if (req.url.includes("categories")) {
				req.on("data", (data) => {
					let categories = fileRead("categories");
					data = JSON.parse(data);
					for (let i in categories) {
						if (categories[i].categoryId == reqId) {
							categories[i] = {
								...products[i],
								categoryId: +reqId,
								...data,
							};
						}
					}
					fileWrite("categories", categories);
					return res.end("Updated categories !!!");
				});
			} else if (req.url.includes("products")) {
				req.on("data", (data) => {
					let products = fileRead("products");
					data = JSON.parse(data);
					for (let i in products) {
						if (products[i].productId == reqId) {
							products[i] = {
								...products[i],
								productId: +reqId,
								...data,
							};
						}
					}
					fileWrite("products", products);
					return res.end("Updated products !!!");
				});
			}
		} else if (req.method == "DELETE") {
			if (req.url.includes("subcategories")) {
				let subCategories = fileRead("subCategories");
				subCategories = subCategories.filter((i) => i.subCategoryId != reqId);
				fileWrite("subCategories", subCategories);
				return res.end("Delete SubCategories !!!");
			} else if (req.url.includes("categories")) {
				let categories = fileRead("categories");
				categories = categories.filter((i) => i.categoryId != reqId);
				fileWrite("categories", categories);
				return res.end("Delete Categories !!!");
			} else if (req.url.includes("products")) {
				let products = fileRead("products");
				products = products.filter((i) => i.productId != reqId);
				fileWrite("products", products);
				return res.end("Delete products !!!");
			}
		}
	})
	.listen(PORT, (err) => {
		console.log("Server listening on port", PORT);
	});
