"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.json());
var db = require("./db.js");
app.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.send("Hello");
            return [2 /*return*/];
        });
    });
});
app.get('/authors', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allAuthors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.getAuthors()];
                case 1:
                    allAuthors = _a.sent();
                    res.render("AuthorsViews/index", { allAuthors: allAuthors });
                    return [2 /*return*/];
            }
        });
    });
});
app.get('/authors/add', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.render("AuthorsViews/add");
            return [2 /*return*/];
        });
    });
});
app.get('/authors/:authorId/edit', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var author;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.getAuthor(req.params)];
                case 1:
                    author = _a.sent();
                    res.render("AuthorsViews/edit", { author: author });
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/authors/add', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.addAuthors(req.body)];
                case 1:
                    _a.sent();
                    res.render("AuthorsViews/add");
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/authors/:authorId/edit', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allAuthors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.updateAuthor(req.params, req.body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.getAuthors()];
                case 2:
                    allAuthors = _a.sent();
                    res.render("AuthorsViews/index", { allAuthors: allAuthors });
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/authors/:authorId/delete', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allAuthors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.deleteAuthor(req.params)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.getAuthors()];
                case 2:
                    allAuthors = _a.sent();
                    res.render("AuthorsViews/index", { allAuthors: allAuthors });
                    return [2 /*return*/];
            }
        });
    });
});
app.get('/books', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allBooks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.getBooks()];
                case 1:
                    allBooks = _a.sent();
                    res.render("BooksViews/index", { allBooks: allBooks });
                    return [2 /*return*/];
            }
        });
    });
});
app.get('/books/add', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.render("BooksViews/add");
            return [2 /*return*/];
        });
    });
});
app.get('/books/:bookId/edit', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var book;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.getBook(req.params)];
                case 1:
                    book = _a.sent();
                    res.render("BooksViews/edit", { book: book });
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/books/add', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.addBooks(req.body)];
                case 1:
                    _a.sent();
                    res.render("BooksViews/add");
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/books/:bookId/edit', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allBooks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.updateBook(req.params, req.body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.getBooks()];
                case 2:
                    allBooks = _a.sent();
                    res.render("BooksViews/index", { allBooks: allBooks });
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/books/:bookId/delete', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allBooks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.deleteBook(req.params)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.getBooks()];
                case 2:
                    allBooks = _a.sent();
                    res.render("BooksViews/index", { allBooks: allBooks });
                    return [2 /*return*/];
            }
        });
    });
});
app.get('/publishinghouses', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allPublishingHouses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.getPublishingHouses()];
                case 1:
                    allPublishingHouses = _a.sent();
                    res.render("PublishingHousesViews/index", { allPublishingHouses: allPublishingHouses });
                    return [2 /*return*/];
            }
        });
    });
});
app.get('/publishinghouses/add', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.render("PublishingHousesViews/add");
            return [2 /*return*/];
        });
    });
});
app.get('/publishinghouses/:publishinghouseId/edit', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var publishinghouse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.getPublishingHouse(req.params)];
                case 1:
                    publishinghouse = _a.sent();
                    res.render("PublishingHousesViews/edit", { publishinghouse: publishinghouse });
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/publishinghouses/add', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.addPublishingHouses(req.body)];
                case 1:
                    _a.sent();
                    res.render("PublishingHousesViews/add");
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/publishinghouses/:publishinghouseId/edit', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allPublishingHouses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.updatePublishingHouse(req.params, req.body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.getPublishingHouses()];
                case 2:
                    allPublishingHouses = _a.sent();
                    res.render("PublishingHousesViews/index", { allPublishingHouses: allPublishingHouses });
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/publishinghouses/:publishinghouseId/delete', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allPublishingHouses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.deletePublishingHouse(req.params)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.getPublishingHouses()];
                case 2:
                    allPublishingHouses = _a.sent();
                    res.render("PublishingHousesViews/index", { allPublishingHouses: allPublishingHouses });
                    return [2 /*return*/];
            }
        });
    });
});
app.listen(3000, function () {
    console.log("Server is running..");
});
