//This is test
describe("helloWorld", () => {
  it("returns Hello World", () => {
    var actual = helloWorld();
    expect(actual).toBe("Hello World");
  });
  // it("returns Hello ", () => {
  //   var actual = helloWorld("Hello");
  //   expect(actual).toContain("Hello");
  // });
  // it("returns World ", () => {
  //   var actual = helloWorld("World");
  //   expect(actual).toContain("World");
  // });
  // it("returns not empty ", () => {
  //   var actual = helloWorld("Test");
  //   expect(actual).not.toBe("");
  // });
  // it("returns not Hello World ", () => {
  //   var actual = helloWorld();
  //   expect(actual).not.toBe("Hello World !");
  // });
});

describe("math sum", function () {
  //Spec for sum operation
  it("suma dintre 3 si 5", function () {
    //expect(sum(3,5)).toEqual(8);
    expect(sum(3, 5)).toBe(8);
  });
});
describe("math sum 2", function () {
  //Spec for sum operation
  it("suma dintre 0.1 si 0.7", function () {
    expect(sum(0.1, 0.7)).toEqual(0.8);
  });
  it("suma dintre 1.4 si 1.3", function () {
    expect(sum(1.4, 1.3)).toEqual(2.7);
  });
});

describe("factorial", function () {
  //Spec for factorial operation for negative number
  it(" throw error in factorial ", function () {
    expect(function () {
      factorial(-7);
    }).toThrowError(Error);
  });
});
//Spec for factorial operation for positive number
describe("fibonacci2", function () {
  it(" factorial of 4", function () {
    expect(factorial(4)).toBe(24);
  });
});
describe("fibonacci", function () {
  //Spec for sum operation
  it("primele numere din sir", function () {
    expect(fibonacci(6)).toEqual([0, 1, 1, 2, 3, 5, 8]);
    //   daca nu conteaza ordinea
    //   expect(fibonacci(6)).toEqual(jasmine.arrayWithExactContents([0, 1, 2, 1, 3, 5, 8]));
  });
});
