class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A) FILTERING QUERY STRING
    const queryObj = { ...this.queryString, visible: true, available: true };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // 1B) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    // BUILD THE QUERY

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString?.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-updatedAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString?.fields) {
      const limitByFields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(limitByFields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString?.page * 1 || 1;
    const limit = this.queryString?.limit * 1 || 10;
    const skippedData = (page - 1) * limit;

    this.query = this.query.skip(skippedData).limit(limit);

    return this;
  }
}

export default APIfeatures;
