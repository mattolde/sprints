describe("Pricing Rules", function() {
  var checkout, itemAppleTv, itemMacBookPro, itemVGA;

  beforeEach(function() {
    // test with pricing rules
    checkout = new Checkout(pricingRules);

    itemAppleTv = new Item('atv', 'Apple TV', 109.50);
    itemMacBookPro = new Item('mbp', 'MacBook Pro', 1399.99);
    itemVGA = new Item('vga', 'VGA adaptor', 30.00);
    itemSuperIpad = new Item('ipd', 'Super iPad', 549.99);

  });

  afterEach(function(){
    checkout.removeAllDiscounts();
    checkout.removeAllItems();
  });


  // 3 for 2 deal on Apple TVs. e.g. buy 3 Apple TVs, you will pay the price of 2 only
  it("should charge for only two Apple TVs when three are purchased", function() {

    checkout.scan(itemAppleTv);
    checkout.scan(itemAppleTv);
    checkout.scan(itemAppleTv);

    expect(checkout.total()).toBe(219.00);

  });

  it("should charge for only two Apple TVs when three are purchased multiple times", function() {

    checkout.scan(itemAppleTv);
    checkout.scan(itemAppleTv);
    checkout.scan(itemAppleTv);

    expect(checkout.total()).toBe(219.00);

    checkout.scan(itemAppleTv);
    checkout.scan(itemAppleTv);
    checkout.scan(itemAppleTv);

    expect(checkout.total()).toBe(438.00);

    checkout.scan(itemAppleTv);
    checkout.scan(itemAppleTv);
    checkout.scan(itemAppleTv);

    expect(checkout.total()).toBe(657.00);

  });

  // Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4
  it("should give a bulk discount of $499.99 on each Super iPad when more then 4 are purchased", function() {

    checkout.scan(itemSuperIpad);
    checkout.scan(itemSuperIpad);
    checkout.scan(itemSuperIpad);
    checkout.scan(itemSuperIpad);

    expect(checkout.total()).toBe(1999.96);

    checkout.scan(itemSuperIpad);

    expect(checkout.total()).toBe(2499.95);

    checkout.scan(itemSuperIpad);
    checkout.scan(itemSuperIpad);

    expect(checkout.total()).toBe(3499.93);

  });

  // bundle in a free VGA adapter free of charge with every MacBook Pro sold
  it("should receive a free VGA adapter for every Macbook Pro purchased", function() {

    checkout.scan(itemMacBookPro);

    expect(checkout.items.vga).toBeDefined();

    expect(checkout.items.vga.price).toBe(0.00);

  });

});
