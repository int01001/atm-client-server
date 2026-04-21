#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("{\"error\": \"Please provide exactly one argument for the withdrawal amount.\"}\n");
        return 1;
    }

    int amount = atoi(argv[1]);

    if (amount <= 0) {
        printf("{\"error\": \"Amount must be greater than zero.\"}\n");
        return 1;
    }

    if (amount % 100 != 0) {
        printf("{\"error\": \"Amount must be a multiple of 100.\"}\n");
        return 1;
    }

    int denominations[] = {500, 200, 100};
    int counts[3] = {0};
    int num_denoms = sizeof(denominations) / sizeof(denominations[0]);

    int remaining = amount;

    for (int i = 0; i < num_denoms; i++) {
        if (remaining >= denominations[i]) {
            counts[i] = remaining / denominations[i];
            remaining = remaining % denominations[i];
        }
    }

    if (remaining > 0) {
        printf("{\"error\": \"Cannot dispense the exact amount with available denominations.\"}\n");
        return 1;
    }

    // Print JSON output
    printf("{");
    int first = 1;
    for (int i = 0; i < num_denoms; i++) {
        if (counts[i] > 0) {
            if (!first) {
                printf(", ");
            }
            printf("\"%d\": %d", denominations[i], counts[i]);
            first = 0;
        }
    }
    printf("}\n");

    return 0;
}
