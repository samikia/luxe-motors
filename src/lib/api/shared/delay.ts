/** Simulates network latency so loading states are visible during the mock-data phase. */
export function simulateNetworkDelay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
