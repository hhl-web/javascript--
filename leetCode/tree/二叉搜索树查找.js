const find1 = (root, val) => {
    if (!root) return false;
    if (root.val === val) {
        return true;
    } else if (root.val > val) {
        return find(root.left, val);
    } else if (root.val < val) {
        return find(root.right, val);
    }
    return false;
}

const find2 = (root, val) => {
    if (!root) return false;
    let node = root;
    while (node != null) {
        if (node.data == val) {
            return true;
        } else if (node.data < val) {
            node = node.rightNode;
        } else if (node.data > val) {
            node = node.leftNode;
        }
    }
    return false;
}