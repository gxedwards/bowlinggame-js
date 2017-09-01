describe("BowlingGame", function() {

    var g;
    beforeEach(function() {
        g = new Game();
    });

    it("Gutter Game", function() {
        rollMany(20,0);
        expect(g.score()).toBe(0);
    });

    it("AllOnes", function() {
        rollMany(20,1);
        expect(g.score()).toBe(20);
    });

    it('OneSpare', function(){
        rollSpare();
        g.roll(3);
        rollMany(17,0);
        expect(g.score()).toBe(16);
    });

    it('OneStrike', function(){
        rollStrike();
        g.roll(3);
        g.roll(4);
        rollMany(16,0);
        expect(g.score()).toBe(24);
    });

    it('Perfect Game', function(){
        rollMany(12,10);
        expect(g.score()).toBe(300);
    });

    function rollSpare(){
        g.roll(5);
        g.roll(5);
    }
    function rollStrike(){
        g.roll(10);
    }

    function rollMany(n, pins){
        for (var i=0; i< n; i++){
            g.roll(pins);
        }
    }

 });
