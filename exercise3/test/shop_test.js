const assert = require("assert");

class CD {
    id;
    stock;
    title;
    artist;
    reviews;

    constructor(id, stock, title, artist) {
        this.id = id;
        this.stock = stock;
        this.title = title;
        this.artist = artist;
        this.reviews = [];
    }

    buy() {
        if (this.stock === 0) throw new Error("Not enough in stock")
        this.stock = this.stock - 1;
    }

    rate(rating, description) {
        let _rating = rating;
        if (rating > 10) _rating = 10;
        if (rating < 1) _rating = 1;
        this.reviews.push({rating: _rating, description});
    }

    getRating() {
        const total = this.reviews.reduce((total, {rating}) => {
            return total + rating;
        }, 0);
        return total / this.reviews.length;
    }
}

class Shop {
    cds;

    constructor(cds) {
        this.cds = cds;
    }

    getByTitle(title) {
        return this.cds.find((cd) => cd.title === title);
    }

    getByArtist(artist) {
        return this.cds.find((cd) => cd.artist === artist);
    }

    search(term) {
        const artistCd = this.getByArtist(term);
        const titleCd = this.getByTitle(term);
        const cd = artistCd ?? titleCd;

        if (!cd) throw new Error("No cd found");

        return cd;
    }

    sendBatch(batch) {
        for(const batchItem of batch) {
            const cd = this.getCD(batchItem.id);
            if (!cd) continue;
            cd.stock += batchItem.quantity;
        }
    }

    getCD(id) {
        return this.cds.find(cd => cd.id === id);
    }
}

describe("Shop", () => {
    describe("when a user buys a cd", () => {
        it("decrease stock with 1", () => {
            const cd = new CD("MICHAEL001", 10);
            cd.buy();

            assert.deepEqual(cd.stock, 9);
        })

        describe("when there is not enough in stock", () => {
            it("throws an error", () => {
                const cd = new CD("MICHAEL001", 0);

                assert.throws(() => cd.buy(), new Error("Not enough in stock"))
            })
        })
    })

    describe("when a user searches for a title", () => {
        describe("when a cd exists with that title", () => {
            it("should return the cd", () => {
                const michaelCD = new CD("MICHAEL001", 10, "Beat it")
                const shop = new Shop([michaelCD]);
                const foundCD = shop.search("Beat it");

                assert.deepEqual(foundCD.title, "Beat it");
            })
        })

        describe("when no cd exists with that title", () => {
            it("should throw an error", () => {
                const shop = new Shop([]);
                assert.throws(() => shop.search("Thriller"), new Error("No cd found"))
            })
        })
    })

    describe("when a user searches for an artist", () => {
        describe("when a cd exists with that artist", () => {
            it("should return that cd", () => {
                const shop = new Shop([new CD("MICHAEL001", 10, "Beat it", "Michael Jackson")])
                const cd = shop.search("Michael Jackson");
                assert.deepEqual(cd.artist, "Michael Jackson");
            })
        })

        describe("when no cd exists of that artist", () => {
            it("should throw an error", () => {
                const shop = new Shop([new CD("MICHAEL001", 10, "Beat it", "Michael Jackson")]);
                assert.throws(() => shop.search("John Legend"), new Error("No cd found"))
            })
        })
    })

    describe("when a batch of cds is sent", () => {
        it("should increase the stock of each cd", () => {
            const cd1 = new CD("MICHAEL001", 10, "Beat it", "Michael Jackson");
            const cd2 = new CD("K3001", 10, "Oya lele", "K3");

            const shop = new Shop([cd1, cd2]);
            shop.sendBatch([{ id: "MICHAEL001", quantity: 10 }, { id: "K3001", quantity: 5}]);

            assert.deepEqual(cd1.stock, 20);
            assert.deepEqual(cd2.stock, 15);
        })
    })

    describe('when a rating is left', () => {
        it('should record the rating', () => {
            const cd = new CD("MICHAEL001", 10, "Beat it", "Michael Jackson");
            cd.rate(9);
            assert.deepEqual(cd.getRating(), 9)
        })

        it('should average the recorded ratings', () => {
            const cd = new CD("MICHAEL001", 10, "Beat it", "Michael Jackson");
            cd.rate(6);
            cd.rate(8);
            assert.deepEqual(cd.getRating(), 7)
        })

        describe('when the provided rating is higher than a 10', () => {
            it('should clamp to 10', () => {
                const cd = new CD("MICHAEL001", 10, "Beat it", "Michael Jackson");
                cd.rate(11);
                assert.deepEqual(cd.getRating(), 10);
            })
        })

        describe('when the provided rating is lower than a 1', () => {
            it("should clamp to 1", () => {
                const cd = new CD("MICHAEL001", 10, "Beat it", "Michael Jackson");
                cd.rate(0);
                assert.deepEqual(cd.getRating(), 1);
            })
        })
    })

    describe("when a list of all reviews is requested", () => {
        it("should return the list", () => {
            const cd = new CD("MICHAEL001", 10, "Beat it", "Michael Jackson");
            cd.rate(7, "Very good!");
            cd.rate(2, "Very bad!");
            assert.deepEqual(cd.reviews, [{rating: 7, description: "Very good!"}, {
                rating: 2,
                description: "Very bad!"
            }])
        })
    })
})