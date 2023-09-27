const pipeline = (status) => {
    return [
        { $match: { status: status } },
        { $group: { _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" }, status: "$status" }, total: { $sum: 1 } } }
    ]
}

module.exports = pipeline;