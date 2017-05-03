const expect = require('chai').expect
const assert = require('chai').assert
const supertest = require('supertest-as-promised')(require('../../app.js'))

describe('/input POST route', function() {


    it('responds with an obj containing entities and sentiment keys', function() {
        return supertest
            .post('/input', {sentence: 'Early one morning a hungry Wolf was prowling around a cottage at the edge of a village, when he heard a child crying in the house.'})
            .expect(201)
            .expect(function(res) {
                expect(res.body).to.have.property('sentiment')
                expect(res.body).to.have.property('entities')
            })
    })

    it('has a number for the sentiment', function() {
        return supertest
            .post('/input', {sentence: 'Early one morning a hungry Wolf was prowling around a cottage at the edge of a village, when he heard a child crying in the house.'})
            .expect(function(res) {
                assert.typeOf(res.body.sentiment, 'number', 'sentiment is a number')
            })
    })

    it('has an array of strings for the entities', function() {
        return supertest
            .post('/input', {sentence: 'Early one morning a hungry Wolf was prowling around a cottage at the edge of a village, when he heard a child crying in the house.'})
            .expect(function(res) {
                assert.typeOf(res.body.entities, 'array', 'entitities is an array')
                assert.typeOf(res.body.entities[0], 'string', 'it is an array of strings!')
            })
    })
})