describe('prueba de boolean', function(){
	it('true debería ser true', function(){
		expect(true).toBe(true);
	});

	it('false debería ser false', function(){
		expect(false).toBe(false);
	});
});

xdescribe('prueba de boolean 2 (omitida)', function(){
	it('true debería ser true', function(){
		expect(true).toBe(true);
	});
});

describe('prueba de boolean 3', function(){
	it('true debería ser true', function(){
		expect(true).toBe(true);
	});
	xit('false debería ser false (omitida)', function(){
		expect(false).toBe(false);
	});
});
