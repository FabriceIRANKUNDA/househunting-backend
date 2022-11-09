class APIfeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdOn');
      }
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const limitByFields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(limitByFields);
      } else {
        this.query = this.query.select('-__v -questionsAndAnswers -createdOn -isAttempted -smsCode');
      }
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 10;
      const skippedData = (page - 1) * limit;
  
      this.query = this.query.skip(skippedData).limit(limit);
  
      return this;
    }
  }


export default APIfeatures